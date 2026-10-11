import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";
import { DatabaseModel } from "../model/DatabaseModel.js";

const SECRET = process.env.JWT_SECRET ?? "segredo_padrao";
const database = new DatabaseModel().pool;

interface JwtPayload {
    idUsuario: number;
    email:     string;
    exp:       number;
}

// Estende o Request para carregar o usuário autenticado nos middlewares seguintes
declare global {
    namespace Express {
        interface Request {
            usuario?: Omit<JwtPayload, "exp">;
        }
    }
}

export class Auth {

    /**
     * Valida email + senha e devolve um token JWT
     */
    static async validacaoUsuario(req: Request, res: Response): Promise<void> {
        const { email, senha } = req.body as { email: string; senha: string };

        if (!email || !senha) {
            res.status(400).json({ auth: false, message: "Email e senha são obrigatórios." });
            return;
        }

        try {
            const resultado = await database.query(
                `SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = $1`,
                [email]
            );

            if (resultado.rowCount === 0) {
                res.status(401).json({ auth: false, token: null, message: "Email ou senha incorretos." });
                return;
            }

            const row = resultado.rows[0];
            const senhaValida = await bcrypt.compare(senha, row.senha);

            if (!senhaValida) {
                res.status(401).json({ auth: false, token: null, message: "Email ou senha incorretos." });
                return;
            }

            const usuario = {
                idUsuario: row.id_usuario,
                nome:      row.nome,
                email:     row.email,
            };

            const token = Auth.generateToken(usuario.idUsuario, usuario.email);

            res.status(200).json({ auth: true, token, usuario });

        } catch (error) {
            console.error("[Auth] Erro na validação:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    /**
     * Gera o token JWT com idUsuario e email
     */
    static generateToken(idUsuario: number, email: string): string {
        return jwt.sign({ idUsuario, email }, SECRET, { expiresIn: "8h" });
    }

    /**
     * Middleware que protege rotas — verifica o token Bearer
     */
    static verifyToken(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ auth: false, message: "Token não informado." });
            return;
        }

        const token = authHeader.split(" ")[1] ?? "";

        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    res.status(401).json({ auth: false, message: "Token expirado, faça login novamente." });
                } else {
                    res.status(401).json({ auth: false, message: "Token inválido." });
                }
                return;
            }

            if (!decoded) {
                res.status(401).json({ auth: false, message: "Token inválido." });
                return;
            }

            const { exp, idUsuario, email } = decoded as JwtPayload;

            const agora = Math.floor(Date.now() / 1000);
            if (!exp || agora > exp) {
                res.status(401).json({ auth: false, message: "Token expirado, faça login novamente." });
                return;
            }

            req.usuario = { idUsuario, email };
            next();
        });
    }
}