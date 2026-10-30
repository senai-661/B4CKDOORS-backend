// src/server.ts
import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { router } from "./routes.js";

const app = express();

if (env.trustProxy !== undefined) app.set("trust proxy", env.trustProxy);

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

/**
 * CORS: origens permitidas vêm de FRONTEND_URL (lista separada por vírgula).
 *  - Em desenvolvimento, sem FRONTEND_URL, libera qualquer origem.
 *  - Em produção, sem FRONTEND_URL, nenhuma origem de navegador é liberada.
 * Requisições sem cabeçalho Origin (curl, health checks) não são afetadas.
 */
if (env.isProd && env.frontendUrls.length === 0) {
    console.warn("⚠️  FRONTEND_URL não definido: nenhuma origem de navegador será aceita pelo CORS.");
}
app.use(
    cors({
        origin(origem, callback) {
            if (!origem) return callback(null, true);
            if (env.frontendUrls.length === 0) return callback(null, !env.isProd);
            return callback(null, env.frontendUrls.includes(origem));
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        maxAge: 600,
    })
);

app.use(express.json({ limit: "100kb" }));
app.use(router);

// 404 para rotas inexistentes
app.use((req: Request, res: Response) => {
    res.status(404).json({ mensagem: "Rota não encontrada." });
});

// Tratamento global de erros (JSON malformado, payload grande, falhas inesperadas)
app.use((erro: unknown, req: Request, res: Response, _next: NextFunction) => {
    const e = erro as { type?: string; status?: number };
    if (e?.type === "entity.parse.failed") return res.status(400).json({ mensagem: "JSON inválido no corpo da requisição." });
    if (e?.type === "entity.too.large") return res.status(413).json({ mensagem: "Corpo da requisição grande demais." });
    console.error("[Erro não tratado]", erro);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
});

export const server = app;
