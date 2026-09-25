// src/repositories/ProdutoRepository.ts
import pool from '../config/database';
import { Produto, ProdutoCreateDTO, ProdutoUpdateDTO } from '../models/Produto';

export class ProdutoRepository {
    async criar(dados: ProdutoCreateDTO): Promise<Produto> {
        const result = await pool.query(
            `INSERT INTO produtos (nome, preco, estoque) VALUES ($1, $2, $3) RETURNING *`,
            [dados.nome, dados.preco, dados.estoque]
        );
        return result.rows[0];
    }

    async buscarPorId(id: number): Promise<Produto | null> {
        const result = await pool.query(`SELECT * FROM produtos WHERE id = $1`, [id]);
        return result.rows[0] || null;
    }

    async listarTodos(): Promise<Produto[]> {
        const result = await pool.query(`SELECT * FROM produtos ORDER BY id`);
        return result.rows;
    }

    async atualizar(id: number, dados: ProdutoUpdateDTO): Promise<Produto | null> {
        const campos: string[] = [];
        const valores: unknown[] = [];
        let index = 1;

        if (dados.nome !== undefined) {
            campos.push(`nome = $${index++}`);
            valores.push(dados.nome);
        }
        if (dados.preco !== undefined) {
            campos.push(`preco = $${index++}`);
            valores.push(dados.preco);
        }
        if (dados.estoque !== undefined) {
            campos.push(`estoque = $${index++}`);
            valores.push(dados.estoque);
        }

        if (campos.length === 0) {
            return this.buscarPorId(id);
        }

        valores.push(id);
        const result = await pool.query(
            `UPDATE produtos SET ${campos.join(', ')} WHERE id = $${index} RETURNING *`,
            valores
        );
        return result.rows[0] || null;
    }

    async remover(id: number): Promise<boolean> {
        const result = await pool.query(`DELETE FROM produtos WHERE id = $1`, [id]);
        return (result.rowCount ?? 0) > 0;
    }
}
