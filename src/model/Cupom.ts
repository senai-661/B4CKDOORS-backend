import { DatabaseModel } from "./DatabaseModel.js";
import type { CupomDTO } from "../interface/CupomDTO.js";

const database = new DatabaseModel().pool;

export class Cupom {

    static async listarCupons(): Promise<CupomDTO[] | null> {
        try {
            const resposta = await database.query(
                `SELECT id_cupom, codigo, desconto, ativo FROM cupons ORDER BY codigo ASC`
            );
            return resposta.rows.map((row) => ({
                idCupom:  row.id_cupom,
                codigo:   row.codigo,
                desconto: Number(row.desconto),
                ativo:    row.ativo,
            }));
        } catch (error) {
            console.error("[Cupom] Erro ao listar:", error);
            return null;
        }
    }

    static async buscarCupom(id: number): Promise<CupomDTO | null> {
        try {
            const resposta = await database.query(
                `SELECT id_cupom, codigo, desconto, ativo FROM cupons WHERE id_cupom = $1`,
                [id]
            );
            if (resposta.rows.length === 0) return null;
            const row = resposta.rows[0];
            return {
                idCupom:  row.id_cupom,
                codigo:   row.codigo,
                desconto: Number(row.desconto),
                ativo:    row.ativo,
            };
        } catch (error) {
            console.error("[Cupom] Erro ao buscar:", error);
            return null;
        }
    }

    static async buscarPorCodigo(codigo: string): Promise<CupomDTO | null> {
        try {
            const resposta = await database.query(
                `SELECT id_cupom, codigo, desconto, ativo FROM cupons WHERE codigo = $1 AND ativo = TRUE`,
                [codigo]
            );
            if (resposta.rows.length === 0) return null;
            const row = resposta.rows[0];
            return {
                idCupom:  row.id_cupom,
                codigo:   row.codigo,
                desconto: Number(row.desconto),
                ativo:    row.ativo,
            };
        } catch (error) {
            console.error("[Cupom] Erro ao buscar por código:", error);
            return null;
        }
    }

    static async cadastrarCupom(cupom: CupomDTO): Promise<boolean> {
        try {
            const resposta = await database.query(
                `INSERT INTO cupons (codigo, desconto, ativo) VALUES ($1, $2, $3) RETURNING id_cupom`,
                [cupom.codigo, cupom.desconto, cupom.ativo]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Cupom] Erro ao cadastrar:", error);
            return false;
        }
    }

    static async atualizarCupom(id: number, cupom: CupomDTO): Promise<boolean> {
        try {
            const resposta = await database.query(
                `UPDATE cupons SET codigo = $1, desconto = $2, ativo = $3 WHERE id_cupom = $4 RETURNING id_cupom`,
                [cupom.codigo, cupom.desconto, cupom.ativo, id]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Cupom] Erro ao atualizar:", error);
            return false;
        }
    }

    static async removerCupom(id: number): Promise<boolean> {
        try {
            const resposta = await database.query(
                `DELETE FROM cupons WHERE id_cupom = $1 RETURNING id_cupom`,
                [id]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Cupom] Erro ao remover:", error);
            return false;
        }
    }
}

export default Cupom;