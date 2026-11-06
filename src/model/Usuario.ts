// src/model/Usuario.ts
import { DatabaseModel } from "./DatabaseModel.js";
import type { UsuarioDTO } from "../interface/UsuarioDTO.js";

const database = new DatabaseModel().pool;

export class Usuario {

    static async autenticarUsuario(email: string, senha: string): Promise<Omit<UsuarioDTO, "senha"> | null> {
        const resposta = await database.query(
            `SELECT id_usuario, nome, email, cpf, senha FROM usuarios WHERE LOWER(email) = LOWER($1)`,
            [email]
        );
        const row = resposta.rows[0];
        if (!row || row.senha !== senha) return null;

        return {
            idUsuario: row.id_usuario,
            nome: row.nome,
            email: row.email,
            cpf: row.cpf,
        };
    }

    static async listarUsuarios(): Promise<UsuarioDTO[] | null> {
        try {
            const resposta = await database.query(`
                SELECT id_usuario, nome, email, cpf, created_at
                FROM usuarios ORDER BY nome ASC
            `);
            return resposta.rows.map((row) => ({
                idUsuario: row.id_usuario,
                nome:      row.nome,
                email:     row.email,
                cpf:       row.cpf,
                senha:     "",
            }));
        } catch (error) {
            console.error("[Usuario] Erro ao listar:", error);
            return null;
        }
    }

    static async buscarUsuario(id: number): Promise<UsuarioDTO | null> {
        try {
            const resposta = await database.query(
                `SELECT id_usuario, nome, email, cpf FROM usuarios WHERE id_usuario = $1`, [id]
            );
            if (resposta.rows.length === 0) return null;
            const row = resposta.rows[0];
            return { idUsuario: row.id_usuario, nome: row.nome, email: row.email, cpf: row.cpf, senha: "" };
        } catch (error) {
            console.error("[Usuario] Erro ao buscar:", error);
            return null;
        }
    }

    static async cadastrarUsuario(usuario: UsuarioDTO): Promise<boolean> {
        try {
            const resposta = await database.query(
                `INSERT INTO usuarios (nome, email, cpf, senha) VALUES ($1, $2, $3, $4) RETURNING id_usuario`,
                [usuario.nome, usuario.email, usuario.cpf, usuario.senha]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Usuario] Erro ao cadastrar:", error);
            return false;
        }
    }

    static async atualizarUsuario(id: number, usuario: UsuarioDTO): Promise<boolean> {
        try {
            const resposta = await database.query(
                `UPDATE usuarios SET nome = $1, email = $2, cpf = $3 WHERE id_usuario = $4 RETURNING id_usuario`,
                [usuario.nome, usuario.email, usuario.cpf, id]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Usuario] Erro ao atualizar:", error);
            return false;
        }
    }

    static async removerUsuario(id: number): Promise<boolean> {
        try {
            const resposta = await database.query(
                `DELETE FROM usuarios WHERE id_usuario = $1 RETURNING id_usuario`, [id]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Usuario] Erro ao remover:", error);
            return false;
        }
    }
}

export default Usuario;