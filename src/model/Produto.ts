// src/model/Produto.ts
import { DatabaseModel } from "./DatabaseModel.js";
import type { ProdutoDTO } from "../interface/ProdutoDTO.js";

const database = new DatabaseModel().pool;

const SQL = {
    listar: `
        SELECT id_produto, cod_produto, nome, descricao, preco, estoque, id_categoria
        FROM produtos ORDER BY nome ASC
    `,
    buscar: `
        SELECT id_produto, cod_produto, nome, descricao, preco, estoque, id_categoria
        FROM produtos WHERE id_produto = $1
    `,
    cadastrar: `
        INSERT INTO produtos (nome, descricao, preco, estoque, id_categoria)
        VALUES ($1, $2, $3, $4, $5) RETURNING id_produto
    `,
    atualizar: `
        UPDATE produtos SET nome = $1, descricao = $2, preco = $3, estoque = $4, id_categoria = $5
        WHERE id_produto = $6 RETURNING id_produto
    `,
    remover: `
        DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto
    `,
};

// Mapeia uma linha do banco para ProdutoDTO
function mapRow(row: Record<string, unknown>): ProdutoDTO {
    return {
        idProduto:   row.id_produto   as number,
        codProduto:  row.cod_produto  as string,
        nome:        row.nome         as string,
        descricao:   row.descricao    as string,
        preco:       Number(row.preco),
        estoque:     row.estoque      as number,
        idCategoria: row.id_categoria as number,
    };
}

// Extrai os parâmetros de um ProdutoDTO para o banco
function produtoParams(produto: ProdutoDTO): unknown[] {
    return [
        produto.nome,
        produto.descricao ?? null,
        produto.preco,
        produto.estoque,
        produto.idCategoria,
    ];
}

export class Produto {

    static async listarProdutos(): Promise<ProdutoDTO[] | null> {
        try {
            const { rows } = await database.query(SQL.listar);
            return rows.map(mapRow);
        } catch (error) {
            console.error("[Produto] Erro ao listar:", error);
            return null;
        }
    }

    static async buscarProduto(id: number): Promise<ProdutoDTO | null> {
        try {
            const { rows } = await database.query(SQL.buscar, [id]);
            return rows.length > 0 ? mapRow(rows[0]) : null;
        } catch (error) {
            console.error("[Produto] Erro ao buscar:", error);
            return null;
        }
    }

    static async cadastrarProduto(produto: ProdutoDTO): Promise<boolean> {
        try {
            const { rows } = await database.query(SQL.cadastrar, produtoParams(produto));
            return rows.length > 0;
        } catch (error) {
            console.error("[Produto] Erro ao cadastrar:", error);
            return false;
        }
    }

    static async atualizarProduto(id: number, produto: ProdutoDTO): Promise<boolean> {
        try {
            const { rows } = await database.query(SQL.atualizar, [...produtoParams(produto), id]);
            return rows.length > 0;
        } catch (error) {
            console.error("[Produto] Erro ao atualizar:", error);
            return false;
        }
    }

    static async removerProduto(id: number): Promise<boolean> {
        try {
            const { rows } = await database.query(SQL.remover, [id]);
            return rows.length > 0;
        } catch (error) {
            console.error("[Produto] Erro ao remover:", error);
            return false;
        }
    }
}

export default Produto;