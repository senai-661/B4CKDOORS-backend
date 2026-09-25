// src/repositories/ClienteRepository.ts
import pool from '../config/database';
import { Cliente, ClienteCreateDTO } from '../models/Cliente';

export class ClienteRepository {
    async criar(dados: ClienteCreateDTO, senhaHash: string): Promise<Cliente> {
        const result = await pool.query(
            `INSERT INTO clientes (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`,
            [dados.nome, dados.email, senhaHash]
        );
        return result.rows[0];
    }

    async buscarPorEmail(email: string): Promise<Cliente | null> {
        const result = await pool.query(`SELECT * FROM clientes WHERE email = $1`, [email]);
        return result.rows[0] || null;
    }

    async buscarPorId(id: number): Promise<Cliente | null> {
        const result = await pool.query(`SELECT * FROM clientes WHERE id = $1`, [id]);
        return result.rows[0] || null;
    }

    async listarTodos(): Promise<Cliente[]> {
        const result = await pool.query(`SELECT * FROM clientes ORDER BY id`);
        return result.rows;
    }

    async atualizar(id: number, dados: Partial<ClienteCreateDTO>): Promise<Cliente | null> {
        const campos: string[] = [];
        const valores: unknown[] = [];
        let index = 1;

        if (dados.nome !== undefined) {
            campos.push(`nome = $${index++}`);
            valores.push(dados.nome);
        }
        if (dados.email !== undefined) {
            campos.push(`email = $${index++}`);
            valores.push(dados.email);
        }
        if (dados.senha !== undefined) {
            campos.push(`senha = $${index++}`);
            valores.push(dados.senha);
        }

        if (campos.length === 0) {
            return this.buscarPorId(id);
        }

        valores.push(id);
        const result = await pool.query(
            `UPDATE clientes SET ${campos.join(', ')} WHERE id = $${index} RETURNING *`,
            valores
        );
        return result.rows[0] || null;
    }

    async remover(id: number): Promise<boolean> {
        const result = await pool.query(`DELETE FROM clientes WHERE id = $1`, [id]);
        return (result.rowCount ?? 0) > 0;
    }
}
