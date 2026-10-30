// src/model/Pedido.ts
import type { PoolClient } from "pg";
import { DatabaseModel, comTransacao } from "./DatabaseModel.js";
import type { PedidoDTO } from "../interface/PedidoDTO.js";
import type { ItemPedidoDTO } from "../interface/ItemPedidoDTO.js";
import { HttpError } from "../utils/HttpError.js";

const database = new DatabaseModel().pool;

const COLUNAS = "id_pedido, cod_pedido, id_usuario, total, status, created_at";

function paraDTO(row: Record<string, any>): PedidoDTO {
    return {
        idPedido: row.id_pedido,
        codPedido: row.cod_pedido,
        idUsuario: row.id_usuario,
        valorTotal: Number(row.total),
        status: row.status,
        dataPedido: row.created_at,
    };
}

/** Devolve ao estoque os itens de um pedido (cancelamento / exclusão). */
async function devolverEstoque(client: PoolClient, idPedido: number): Promise<void> {
    await client.query(
        `UPDATE produtos p SET estoque = p.estoque + i.quantidade
           FROM itens_pedido i
          WHERE i.id_pedido = $1 AND i.id_produto = p.id_produto`,
        [idPedido]
    );
}

export class Pedido {
    /** Sem `idUsuario` lista todos (admin); com `idUsuario` lista só os do cliente. */
    static async listarPedidos(idUsuario?: number): Promise<PedidoDTO[]> {
        const r = idUsuario === undefined
            ? await database.query(`SELECT ${COLUNAS} FROM pedidos ORDER BY created_at DESC, id_pedido DESC`)
            : await database.query(
                  `SELECT ${COLUNAS} FROM pedidos WHERE id_usuario = $1 ORDER BY created_at DESC, id_pedido DESC`,
                  [idUsuario]
              );
        return r.rows.map(paraDTO);
    }

    static async buscarPedido(id: number): Promise<PedidoDTO | null> {
        const r = await database.query(`SELECT ${COLUNAS} FROM pedidos WHERE id_pedido = $1`, [id]);
        if (!r.rows[0]) return null;
        const pedido = paraDTO(r.rows[0]);
        const itens = await database.query(
            `SELECT i.id_item, i.id_produto, p.nome, i.quantidade, i.preco_unitario
               FROM itens_pedido i JOIN produtos p ON p.id_produto = i.id_produto
              WHERE i.id_pedido = $1 ORDER BY i.id_item`,
            [id]
        );
        pedido.itens = itens.rows.map((row): ItemPedidoDTO => ({
            idItem: row.id_item,
            idProduto: row.id_produto,
            nomeProduto: row.nome,
            quantidade: row.quantidade,
            precoUnit: Number(row.preco_unitario),
        }));
        return pedido;
    }

    /**
     * Cria um pedido a partir dos itens do carrinho. O TOTAL é calculado aqui, com os
     * preços do banco (o cliente não consegue "escolher" quanto paga) e o estoque é
     * conferido e baixado na mesma transação.
     */
    static async cadastrarPedidoComItens(
        idUsuario: number,
        itensSolicitados: { idProduto: number; quantidade: number }[]
    ): Promise<PedidoDTO> {
        return comTransacao(async (client) => {
            // Junta linhas repetidas do mesmo produto
            const quantidades = new Map<number, number>();
            for (const it of itensSolicitados) {
                quantidades.set(it.idProduto, (quantidades.get(it.idProduto) ?? 0) + it.quantidade);
            }
            const ids = [...quantidades.keys()].sort((a, b) => a - b); // ordem fixa evita deadlock

            const produtos = await client.query(
                `SELECT id_produto, nome, preco, estoque FROM produtos WHERE id_produto = ANY($1) ORDER BY id_produto FOR UPDATE`,
                [ids]
            );
            const porId = new Map<number, Record<string, any>>(produtos.rows.map((p) => [p.id_produto as number, p]));

            let total = 0;
            for (const id of ids) {
                const produto = porId.get(id);
                const qtd = quantidades.get(id) ?? 0;
                if (!produto) throw new HttpError(400, `Produto ${id} não encontrado.`);
                if (produto.estoque < qtd) {
                    throw new HttpError(409, `Estoque insuficiente para "${produto.nome}" (disponível: ${produto.estoque}).`);
                }
                total += Number(produto.preco) * qtd;
            }
            total = Math.round(total * 100) / 100;

            const pedidoRow = await client.query(
                `INSERT INTO pedidos (id_usuario, total, status) VALUES ($1, $2, 'PENDENTE') RETURNING ${COLUNAS}`,
                [idUsuario, total]
            );
            const pedido = paraDTO(pedidoRow.rows[0]);

            for (const id of ids) {
                const produto = porId.get(id)!;
                const qtd = quantidades.get(id)!;
                await client.query(
                    `INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES ($1, $2, $3, $4)`,
                    [pedido.idPedido, id, qtd, produto.preco]
                );
                await client.query(`UPDATE produtos SET estoque = estoque - $1 WHERE id_produto = $2`, [qtd, id]);
            }
            return pedido;
        });
    }

    /** Pedido "manual" (sem itens): usado pelo painel administrativo. */
    static async cadastrarPedido(idUsuario: number, valorTotal: number, status: string): Promise<PedidoDTO> {
        const r = await database.query(
            `INSERT INTO pedidos (id_usuario, total, status) VALUES ($1, $2, $3) RETURNING ${COLUNAS}`,
            [idUsuario, valorTotal, status]
        );
        return paraDTO(r.rows[0]);
    }

    /** Atualiza status (e total, se informado). Cancelar devolve os itens ao estoque. */
    static async atualizarPedido(id: number, valorTotal: number | null, status: string): Promise<PedidoDTO | null> {
        return comTransacao(async (client) => {
            const atual = await client.query(`SELECT status FROM pedidos WHERE id_pedido = $1 FOR UPDATE`, [id]);
            if (!atual.rows[0]) return null;
            const statusAtual = atual.rows[0].status as string;

            if (statusAtual === "CANCELADO" && status !== "CANCELADO") {
                throw new HttpError(409, "Pedido cancelado não pode ser reaberto. Crie um novo pedido.");
            }
            if (status === "CANCELADO" && statusAtual !== "CANCELADO") {
                await devolverEstoque(client, id);
            }
            const r = await client.query(
                `UPDATE pedidos SET total = COALESCE($1, total), status = $2 WHERE id_pedido = $3 RETURNING ${COLUNAS}`,
                [valorTotal, status, id]
            );
            return paraDTO(r.rows[0]);
        });
    }

    static async removerPedido(id: number): Promise<boolean> {
        return comTransacao(async (client) => {
            const atual = await client.query(`SELECT status FROM pedidos WHERE id_pedido = $1 FOR UPDATE`, [id]);
            if (!atual.rows[0]) return false;
            if (atual.rows[0].status !== "CANCELADO") await devolverEstoque(client, id);
            await client.query(`DELETE FROM pedidos WHERE id_pedido = $1`, [id]);
            return true;
        });
    }
}

export default Pedido;
