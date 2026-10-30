// src/controller/AuthController.ts
import type { Request, Response } from "express";
import { Usuario } from "../model/Usuario.js";
import { gerarToken } from "../middlewares/Auth.js";
import { compararSenha, HASH_FICTICIO } from "../utils/senha.js";
import { HttpError, tratarErro } from "../utils/HttpError.js";
import { corpo } from "../utils/validacao.js";
import { env } from "../config/env.js";

class AuthController {
    /** POST /api/login */
    static async login(req: Request, res: Response): Promise<Response> {
        try {
            const dados = corpo(req);
            const email = typeof dados.email === "string" ? dados.email.trim().toLowerCase() : "";
            const senha = typeof dados.senha === "string" ? dados.senha : "";
            if (!email || !senha) throw new HttpError(400, "Informe e-mail e senha.");

            const usuario = email.length <= 150 && senha.length <= 128 ? await Usuario.buscarParaLogin(email) : null;

            // Sempre executa o bcrypt (mesmo sem usuário) para o tempo de resposta não revelar se o e-mail existe.
            const confere = await compararSenha(senha, usuario?.senhaHash ?? HASH_FICTICIO);

            if (!usuario || !confere) {
                // Mensagem genérica: não diz se o erro foi no e-mail ou na senha.
                return res.status(401).json({ auth: false, token: null, mensagem: "E-mail e/ou senha incorretos." });
            }

            const token = gerarToken({ id: usuario.idUsuario, nome: usuario.nome, email: usuario.email, role: usuario.role });
            return res.status(200).json({
                auth: true,
                token,
                expiresIn: env.jwtExpiresIn,
                usuario: {
                    id: usuario.idUsuario,
                    idUsuario: usuario.idUsuario, // compatibilidade com o frontend
                    nome: usuario.nome,
                    email: usuario.email,
                    role: usuario.role,
                },
            });
        } catch (error) {
            return tratarErro(res, error, "Erro ao realizar login");
        }
    }

    /** GET /api/me : dados do usuário do token atual. */
    static async me(req: Request, res: Response): Promise<Response> {
        try {
            const u = req.usuario;
            if (!u) throw new HttpError(401, "Token não informado.");
            return res.status(200).json({ id: u.id, idUsuario: u.id, nome: u.nome, email: u.email, role: u.role });
        } catch (error) {
            return tratarErro(res, error, "Erro ao consultar usuário autenticado");
        }
    }
}

export default AuthController;
