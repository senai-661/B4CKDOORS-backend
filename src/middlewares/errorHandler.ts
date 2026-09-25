// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    public readonly statusCode: number;

    constructor(mensagem: string, statusCode: number) {
        super(mensagem);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ mensagem: err.message });
        return;
    }

    const pgError = err as { code?: string; constraint?: string };

    if (pgError.code === '23505') {
        res.status(409).json({ mensagem: 'Registro duplicado' });
        return;
    }

    if (pgError.code === '23503') {
        res.status(400).json({ mensagem: 'Violação de integridade referencial' });
        return;
    }

    if (pgError.code === '23514') {
        res.status(400).json({ mensagem: 'Dados inválidos' });
        return;
    }

    if (err.message === 'ESTOQUE_INSUFICIENTE') {
        res.status(400).json({ mensagem: 'Estoque insuficiente' });
        return;
    }

    if (err.message === 'PRODUTO_NAO_ENCONTRADO') {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
        return;
    }

    res.status(500).json({ mensagem: 'Erro interno do servidor' });
}
