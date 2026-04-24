import { DatabaseModel } from "./DatabaseModel.js";
import type { ProdutoDTO } from "../interface/ProdutoDTO.js";

const database = new DatabaseModel().pool;

export class Produto {
static async listarPedidos(): Promise<PedidoDTO[] | null> {
        try {
            const resposta = await database.query(`
                SELECT id_pedido, cod_pedido, id_usuario, total, status, created_at
                FROM pedidos
                ORDER BY created_at DESC
            `);

            return resposta.rows.map((row: any): PedidoDTO => ({
                idPedido: row.id_pedido,
                codPedido: row.cod_pedido,
                idUsuario: row.id_usuario,
                valorTotal: Number(row.total), // Ajustado para 'valorTotal' conforme sua interface
                status: row.status,
                createdAt: row.created_at
            }));
        } catch (error) {
            console.error("[Pedido] Erro ao listar:", error);
            return null;
        }
    }

    static async cadastrarProduto(p: ProdutoDTO): Promise<boolean> {
        try {
            await database.query(
                `INSERT INTO produtos (nome, descricao, preco, estoque, id_categoria)
                 VALUES ($1, $2, $3, $4, $5)`,
                [p.nome, p.descricao, p.preco, p.estoque, p.idCategoria]
            );
            return true;
        } catch (error) {
            console.error("[Produto] Erro ao cadastrar:", error);
            return false;
        }
    }
}

export default Produto;