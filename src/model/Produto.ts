// src/model/Produto.ts
import { DatabaseModel } from "./DatabaseModel.js";
import type { ProdutoDTO } from "../interface/ProdutoDTO.js";

const database = new DatabaseModel().pool;

const COLUNAS = "id_produto, cod_produto, nome, descricao, preco, estoque, imagem, id_categoria";

function paraDTO(row: Record<string, any>): ProdutoDTO {
    return {
        idProduto: row.id_produto,
        codProduto: row.cod_produto,
        nome: row.nome,
        descricao: row.descricao,
        preco: Number(row.preco),
        estoque: row.estoque,
        imagem: row.imagem,
        idCategoria: row.id_categoria,
    };
}

export class Produto {
    static async listarProdutos(): Promise<ProdutoDTO[]> {
        const r = await database.query(`SELECT ${COLUNAS} FROM produtos ORDER BY nome ASC`);
        return r.rows.map(paraDTO);
    }

    static async buscarProduto(id: number): Promise<ProdutoDTO | null> {
        const r = await database.query(`SELECT ${COLUNAS} FROM produtos WHERE id_produto = $1`, [id]);
        return r.rows[0] ? paraDTO(r.rows[0]) : null;
    }

    static async cadastrarProduto(p: ProdutoDTO): Promise<ProdutoDTO> {
        const r = await database.query(
            `INSERT INTO produtos (nome, descricao, preco, estoque, imagem, id_categoria)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${COLUNAS}`,
            [p.nome, p.descricao ?? null, p.preco, p.estoque, p.imagem ?? null, p.idCategoria]
        );
        return paraDTO(r.rows[0]);
    }

    static async atualizarProduto(id: number, p: ProdutoDTO): Promise<ProdutoDTO | null> {
        const r = await database.query(
            `UPDATE produtos
                SET nome = $1, descricao = $2, preco = $3, estoque = $4, imagem = $5, id_categoria = $6
              WHERE id_produto = $7 RETURNING ${COLUNAS}`,
            [p.nome, p.descricao ?? null, p.preco, p.estoque, p.imagem ?? null, p.idCategoria, id]
        );
        return r.rows[0] ? paraDTO(r.rows[0]) : null;
    }

    static async removerProduto(id: number): Promise<boolean> {
        const r = await database.query(`DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto`, [id]);
        return r.rows.length > 0;
    }
}

export default Produto;
