// src/model/Marca.ts
import { DatabaseModel } from "./DatabaseModel.js";
import type { MarcaDTO } from "../interface/MarcaDTO.js";

const database = new DatabaseModel().pool;

export class Marca {

    static async listarMarcas(): Promise<MarcaDTO[] | null> {
        try {
            const resposta = await database.query(
                `SELECT id_marca, nome FROM marca ORDER BY nome ASC`
            );
            return resposta.rows.map((row) => ({ idMarca: row.id_marca, nome: row.nome }));
        } catch (error) {
            console.error("[Marca] Erro ao listar:", error);
            return null;
        }
    }

    static async buscarMarca(id: number): Promise<MarcaDTO | null> {
        try {
            const resposta = await database.query(
                `SELECT id_marca, nome FROM marca WHERE id_marca = $1`, [id]
            );
            if (resposta.rows.length === 0) return null;
            return { idMarca: resposta.rows[0].id_marca, nome: resposta.rows[0].nome };
        } catch (error) {
            console.error("[Marca] Erro ao buscar:", error);
            return null;
        }
    }

    /** true = criada | "duplicada" = já existe uma marca com esse nome | false = erro */
    static async cadastrarMarca(marca: MarcaDTO): Promise<boolean | "duplicada"> {
        try {
            const resposta = await database.query(
                `INSERT INTO marca (nome) VALUES ($1)
                 ON CONFLICT DO NOTHING RETURNING id_marca`,
                [marca.nome.trim()]
            );
            return resposta.rows.length > 0 ? true : "duplicada";
        } catch (error) {
            console.error("[Marca] Erro ao cadastrar:", error);
            return false;
        }
    }

    /** true = atualizada | null = não existe | "duplicada" = outro registro já usa o nome | false = erro */
    static async atualizarMarca(id: number, marca: MarcaDTO): Promise<boolean | null | "duplicada"> {
        try {
            const resposta = await database.query(
                `UPDATE marca SET nome = $1 WHERE id_marca = $2 RETURNING id_marca`,
                [marca.nome.trim(), id]
            );
            return resposta.rows.length > 0 ? true : null;
        } catch (error: any) {
            if (error?.code === "23505") return "duplicada";
            console.error("[Marca] Erro ao atualizar:", error);
            return false;
        }
    }

    /** Os produtos dessa marca ficam "sem marca" (id_marca = NULL). */
    static async removerMarca(id: number): Promise<boolean> {
        const client = await database.connect();
        try {
            await client.query("BEGIN");
            await client.query(`UPDATE produtos SET id_marca = NULL WHERE id_marca = $1`, [id]);
            const resposta = await client.query(
                `DELETE FROM marca WHERE id_marca = $1 RETURNING id_marca`, [id]
            );
            await client.query("COMMIT");
            return resposta.rows.length > 0;
        } catch (error) {
            await client.query("ROLLBACK").catch(() => undefined);
            console.error("[Marca] Erro ao remover:", error);
            return false;
        } finally {
            client.release();
        }
    }
}

export default Marca;
