import type { Request, Response, NextFunction } from "express";

function getMensagemCampoDuplicado(error: any): string {
    const detail   = typeof error?.detail     === "string" ? error.detail     : "";
    const constraint = typeof error?.constraint === "string" ? error.constraint : "";

    const campoMatch = detail.match(/Key \(([^)]+)\)=/);
    const campo = campoMatch?.[1]?.toLowerCase();

    const mensagensPorCampo: Record<string, string> = {
        email: "Este e-mail já está cadastrado.",
        cpf:   "Este CPF já está cadastrado.",
        nome:  "Este nome já está cadastrado.",
    };

    if (campo && mensagensPorCampo[campo]) return mensagensPorCampo[campo];

    const mensagensPorConstraint: Record<string, string> = {
        usuarios_email_key: "Este e-mail já está cadastrado.",
        usuarios_cpf_key:   "Este CPF já está cadastrado.",
    };

    if (constraint && mensagensPorConstraint[constraint]) return mensagensPorConstraint[constraint];

    return "Este registro já está cadastrado.";
}

export function errorMiddleware(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    console.error(`[${req.method}] ${req.path} ->`, error);

    if (error.code === "23505") {
        res.status(409).json({ mensagem: getMensagemCampoDuplicado(error) });
        return;
    }
    if (error.code === "23503") {
        res.status(400).json({ mensagem: "Referência inválida. O registro relacionado não existe." });
        return;
    }
    if (error.code === "23502") {
        res.status(400).json({ mensagem: `Campo obrigatório faltando: ${error.column}` });
        return;
    }
    if (error.name === "JsonWebTokenError") {
        res.status(401).json({ mensagem: "Token inválido." });
        return;
    }
    if (error.name === "TokenExpiredError") {
        res.status(401).json({ mensagem: "Sessão expirada. Faça login novamente." });
        return;
    }

    res.status(500).json({ mensagem: "Erro interno no servidor." });
}
