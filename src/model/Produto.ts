// src/model/Produto.ts
import { DatabaseModel } from "./DatabaseModel.js";
import type { ProdutoDTO } from "../interface/ProdutoDTO.js";

const database = new DatabaseModel().pool;

export class Produto {

    static async listarProdutos(): Promise<ProdutoDTO[] | null> {
        try {
            const resposta = await database.query(`
                SELECT id_produto, cod_produto, nome, descricao, preco, estoque, id_categoria
                FROM produtos ORDER BY nome ASC
            `);
            return resposta.rows.map((row) => ({
                idProduto:   row.id_produto,
                codProduto:  row.cod_produto,
                nome:        row.nome,
                descricao:   row.descricao,
                preco:       Number(row.preco),
                estoque:     row.estoque,
                idCategoria: row.id_categoria,
            }));
        } catch (error) {
            console.error("[Produto] Erro ao listar:", error);
            return null;
        }
    }

    static async buscarProduto(id: number): Promise<ProdutoDTO | null> {
        try {
            const resposta = await database.query(
                `SELECT id_produto, cod_produto, nome, descricao, preco, estoque, id_categoria
                 FROM produtos WHERE id_produto = $1`, [id]
            );
            if (resposta.rows.length === 0) return null;
            const row = resposta.rows[0];
            return {
                idProduto: row.id_produto, codProduto: row.cod_produto, nome: row.nome,
                descricao: row.descricao, preco: Number(row.preco),
                estoque: row.estoque, idCategoria: row.id_categoria,
            };
        } catch (error) {
            console.error("[Produto] Erro ao buscar:", error);
            return null;
        }
    }

    static async cadastrarProduto(produto: ProdutoDTO): Promise<boolean> {
        try {
            const resposta = await database.query(
                `INSERT INTO produtos (nome, descricao, preco, estoque, id_categoria)
                 VALUES ($1, $2, $3, $4, $5) RETURNING id_produto`,
                [produto.nome, produto.descricao ?? null, produto.preco, produto.estoque, produto.idCategoria]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Produto] Erro ao cadastrar:", error);
            return false;
        }
    }

    static async atualizarProduto(id: number, produto: ProdutoDTO): Promise<boolean> {
        try {
            const resposta = await database.query(
                `UPDATE produtos SET nome = $1, descricao = $2, preco = $3, estoque = $4, id_categoria = $5
                 WHERE id_produto = $6 RETURNING id_produto`,
                [produto.nome, produto.descricao ?? null, produto.preco, produto.estoque, produto.idCategoria, id]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Produto] Erro ao atualizar:", error);
            return false;
        }
    }

    static async removerProduto(id: number): Promise<boolean> {
        try {
            const resposta = await database.query(
                `DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto`, [id]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Produto] Erro ao remover:", error);
            return false;
        }
    }
}

export default Produto;