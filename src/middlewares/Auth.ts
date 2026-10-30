// src/middlewares/Auth.ts
// Autenticação (JWT) e autorização (role) da API.
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { Usuario } from "../model/Usuario.js";
import { ROLES } from "../utils/validacao.js";
import type { Role } from "../utils/validacao.js";
import { tratarErro } from "../utils/HttpError.js";

/** Dados do usuário autenticado, disponíveis em `req.usuario` após o middleware. */
export interface UsuarioToken {
    id: number;
    nome: string;
    email: string;
    role: Role;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            usuario?: UsuarioToken;
        }
    }
}

export function gerarToken(u: UsuarioToken): string {
    return jwt.sign({ id: u.id, nome: u.nome, email: u.email, role: u.role }, env.jwtSecret, {
        algorithm: "HS256",
        expiresIn: env.jwtExpiresIn as NonNullable<SignOptions["expiresIn"]>,
    });
}

function extrairToken(req: Request): string | null {
    const cabecalho = req.headers.authorization;
    if (!cabecalho) return null;
    const [esquema, token] = cabecalho.split(" ");
    return esquema?.toLowerCase() === "bearer" && token ? token : null;
}

type ResultadoToken =
    | { ok: true; usuario: UsuarioToken }
    | { ok: false; motivo: "ausente" | "expirado" | "invalido" };

/**
 * Valida a assinatura/expiração do token e confere no banco se o usuário ainda existe.
 * A role usada é a ATUAL do banco (se um admin for rebaixado/excluído, o token antigo
 * deixa de valer na hora, sem esperar expirar).
 */
async function validar(req: Request): Promise<ResultadoToken> {
    const token = extrairToken(req);
    if (!token) return { ok: false, motivo: "ausente" };

    let payload: jwt.JwtPayload;
    try {
        const decodificado = jwt.verify(token, env.jwtSecret, { algorithms: ["HS256"] });
        if (typeof decodificado === "string") return { ok: false, motivo: "invalido" };
        payload = decodificado;
    } catch (error) {
        return { ok: false, motivo: error instanceof jwt.TokenExpiredError ? "expirado" : "invalido" };
    }

    const id = Number(payload.id);
    if (!Number.isInteger(id) || id <= 0) return { ok: false, motivo: "invalido" };

    const usuario = await Usuario.buscarUsuario(id);
    if (!usuario || !(ROLES as readonly string[]).includes(usuario.role)) return { ok: false, motivo: "invalido" };

    return { ok: true, usuario: { id, nome: usuario.nome, email: usuario.email, role: usuario.role } };
}

/** Exige `Authorization: Bearer <token>` válido. Responde 401 caso contrário. */
export async function autenticar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const r = await validar(req);
        if (!r.ok) {
            const mensagens = {
                ausente: "Token não informado.",
                expirado: "Sessão expirada. Faça login novamente.",
                invalido: "Token inválido. Faça login novamente.",
            };
            res.status(401).json({ auth: false, mensagem: mensagens[r.motivo] });
            return;
        }
        req.usuario = r.usuario;
        next();
    } catch (error) {
        tratarErro(res, error, "Erro ao validar autenticação");
    }
}

/** Identifica o usuário se houver token válido, mas deixa passar anônimos. */
export async function autenticarOpcional(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const r = await validar(req);
        if (r.ok) req.usuario = r.usuario;
        next();
    } catch (error) {
        tratarErro(res, error, "Erro ao validar autenticação");
    }
}

/** Exige que o usuário autenticado tenha uma das roles informadas. Responde 403 caso contrário. */
export function exigirRole(...permitidas: Role[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.usuario) {
            res.status(401).json({ auth: false, mensagem: "Token não informado." });
            return;
        }
        if (!permitidas.includes(req.usuario.role)) {
            res.status(403).json({ mensagem: "Acesso negado: você não tem permissão para esta operação." });
            return;
        }
        next();
    };
}

export const somenteAdmin = exigirRole("admin");
