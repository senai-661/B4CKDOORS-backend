// src/utils/HttpError.ts
import type { Response } from "express";

/** Erro com código HTTP associado. Lançado pelas validações, models e middlewares. */
export class HttpError extends Error {
    public readonly status: number;

    constructor(status: number, mensagem: string) {
        super(mensagem);
        this.name = "HttpError";
        this.status = status;
    }
}

interface ErroPg {
    code?: string;
    constraint?: string;
    message?: string;
}

/**
 * Converte qualquer erro em uma resposta HTTP adequada.
 * Nunca devolve stack trace nem detalhes internos ao cliente.
 */
export function tratarErro(res: Response, error: unknown, contexto: string): Response {
    if (error instanceof HttpError) {
        return res.status(error.status).json({ mensagem: error.message });
    }

    const pg = error as ErroPg;
    switch (pg?.code) {
        case "23505": { // unique_violation
            const c = pg.constraint ?? "";
            if (c.includes("email")) return res.status(409).json({ mensagem: "E-mail já cadastrado." });
            if (c.includes("cpf")) return res.status(409).json({ mensagem: "CPF já cadastrado." });
            if (c.includes("categorias")) return res.status(409).json({ mensagem: "Já existe uma categoria com esse nome." });
            return res.status(409).json({ mensagem: "Já existe um registro com esses dados." });
        }
        case "23503": { // foreign_key_violation
            // DELETE/UPDATE em registro que ainda é referenciado por outra tabela
            if ((pg.message ?? "").startsWith("update or delete on table")) {
                return res.status(409).json({ mensagem: "Não é possível excluir: existem registros vinculados a este item." });
            }
            return res.status(400).json({ mensagem: "Referência inválida: o registro relacionado não existe." });
        }
        case "23502": // not_null_violation
        case "23514": // check_violation
        case "22P02": // invalid_text_representation
        case "22003": // numeric_value_out_of_range
            return res.status(400).json({ mensagem: "Dados inválidos para a operação solicitada." });
    }

    console.error(`[${contexto}]`, error);
    return res.status(500).json({ mensagem: `Erro interno: ${contexto.toLowerCase()}.` });
}
