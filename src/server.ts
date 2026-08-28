import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { router } from "./routes.js";
import { errorMiddleware } from "./middleware/ErrorMiddleware.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

// Middleware 404
server.use((req: Request, res: Response) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

// Middleware de erro global — deve ser o último
server.use(errorMiddleware as any);

export { server };
