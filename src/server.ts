import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { router } from "./routes.js";

const server = express();

// Middlewares base
server.use(express.json());
server.use(cors());

// Rotas da aplicação
server.use(router);

// Middleware 404 - Rota não encontrada
server.use((req: Request, res: Response) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

// Middleware de Erro Global
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[ERRO GLOBAL]: ${err.message}`);
    res.status(500).json({ erro: "Erro interno do servidor" });
});

export { server };