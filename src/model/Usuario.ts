// src/model/Usuario.ts
import { DatabaseModel } from "./DatabaseModel.js";
import type { UsuarioDTO, UsuarioCadastroDTO, UsuarioCredenciaisDTO } from "../interface/UsuarioDTO.js";
import type { Role } from "../utils/validacao.js";

const database = new DatabaseModel().pool;

const COLUNAS = "id_usuario, nome, email, cpf, role";

function paraDTO(row: { id_usuario: number; nome: string; email: string; cpf: string; role: Role }): UsuarioDTO {
    return { idUsuario: row.id_usuario, nome: row.nome, email: row.email, cpf: row.cpf, role: row.role };
}

/**
 * Acesso a dados de usuários. Os métodos propagam os erros do banco (quem
 * trata e converte em HTTP é o controller via tratarErro).
 */
export class Usuario {
    static async listarUsuarios(): Promise<UsuarioDTO[]> {
        const r = await database.query(`SELECT ${COLUNAS} FROM usuarios ORDER BY nome ASC`);
        return r.rows.map(paraDTO);
    }

    static async buscarUsuario(id: number): Promise<UsuarioDTO | null> {
        const r = await database.query(`SELECT ${COLUNAS} FROM usuarios WHERE id_usuario = $1`, [id]);
        return r.rows[0] ? paraDTO(r.rows[0]) : null;
    }

    /** Usado apenas pelo login: devolve também o hash da senha. */
    static async buscarParaLogin(email: string): Promise<UsuarioCredenciaisDTO | null> {
        const r = await database.query(`SELECT ${COLUNAS}, senha FROM usuarios WHERE email = $1`, [email]);
        const row = r.rows[0];
        if (!row) return null;
        return { ...paraDTO(row), idUsuario: row.id_usuario, senhaHash: row.senha };
    }

    static async cadastrarUsuario(u: UsuarioCadastroDTO): Promise<UsuarioDTO> {
        const r = await database.query(
            `INSERT INTO usuarios (nome, email, cpf, senha, role) VALUES ($1, $2, $3, $4, $5) RETURNING ${COLUNAS}`,
            [u.nome, u.email, u.cpf, u.senhaHash, u.role]
        );
        return paraDTO(r.rows[0]);
    }

    /** `role` e `senhaHash` são opcionais: quando null, o valor atual é mantido. */
    static async atualizarUsuario(
        id: number,
        d: { nome: string; email: string; cpf: string; role: Role | null; senhaHash: string | null }
    ): Promise<UsuarioDTO | null> {
        const r = await database.query(
            `UPDATE usuarios
                SET nome = $1, email = $2, cpf = $3,
                    role  = COALESCE($4, role),
                    senha = COALESCE($5, senha)
              WHERE id_usuario = $6
          RETURNING ${COLUNAS}`,
            [d.nome, d.email, d.cpf, d.role, d.senhaHash, id]
        );
        return r.rows[0] ? paraDTO(r.rows[0]) : null;
    }

    static async removerUsuario(id: number): Promise<boolean> {
        const r = await database.query(`DELETE FROM usuarios WHERE id_usuario = $1 RETURNING id_usuario`, [id]);
        return r.rows.length > 0;
    }

    static async contarAdmins(): Promise<number> {
        const r = await database.query(`SELECT COUNT(*)::int AS total FROM usuarios WHERE role = 'admin'`);
        return r.rows[0].total as number;
    }
}

export default Usuario;
