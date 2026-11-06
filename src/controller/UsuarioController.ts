// src/controller/UsuarioController.ts
import type { Request, Response } from "express";
import { createHmac } from "node:crypto";
import { Usuario } from "../model/Usuario.js";
import type { UsuarioDTO } from "../interface/UsuarioDTO.js";

class UsuarioController {

    static async login(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body as { email?: unknown; senha?: unknown };
        if (typeof email !== "string" || typeof senha !== "string" || !email.trim() || !senha) {
            return res.status(400).json({ message: "Informe e-mail e senha." });
        }

        try {
            const usuario = await Usuario.autenticarUsuario(email.trim(), senha);
            if (!usuario) {
                return res.status(401).json({ auth: false, message: "Usuário e/ou senha incorretos." });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                console.error("[Usuario] JWT_SECRET não está configurado.");
                return res.status(500).json({ auth: false, message: "Autenticação não configurada no servidor." });
            }

            const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
            const role = adminEmail && usuario.email.trim().toLowerCase() === adminEmail
                ? "admin"
                : "cliente";
            const agora = Math.floor(Date.now() / 1000);
            const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
            const payload = Buffer.from(JSON.stringify({
                sub: String(usuario.idUsuario),
                role,
                iat: agora,
                exp: agora + 8 * 60 * 60,
            })).toString("base64url");
            const assinatura = createHmac("sha256", secret)
                .update(`${header}.${payload}`)
                .digest("base64url");
            const token = `${header}.${payload}.${assinatura}`;

            return res.status(200).json({
                auth: true,
                token,
                usuario: { ...usuario, role },
            });
        } catch (error) {
            console.error("[Usuario] Erro ao autenticar:", error);
            return res.status(500).json({ auth: false, message: "Erro interno ao autenticar usuário." });
        }
    }

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const lista = await Usuario.listarUsuarios();
            if (lista === null) return res.status(500).json({ mensagem: "Erro ao listar usuários." });
            return res.status(200).json(lista);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao listar usuários." });
        }
    }

    static async usuario(req: Request, res: Response): Promise<Response> {
        try {
            const { idUsuario } = req.params;
            const usuario = await Usuario.buscarUsuario(Number(idUsuario));
            if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado." });
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao buscar usuário." });
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dados: UsuarioDTO = req.body;
            if (!dados.nome || !dados.email || !dados.cpf || !dados.senha) {
                return res.status(400).json({ mensagem: "Os campos nome, email, cpf e senha são obrigatórios." });
            }
            const sucesso = await Usuario.cadastrarUsuario(dados);
            if (sucesso) return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso." });
            return res.status(400).json({ mensagem: "Erro ao cadastrar usuário." });
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao cadastrar usuário." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { idUsuario } = req.params;
            const dados: UsuarioDTO = req.body;
            if (!dados.nome || !dados.email || !dados.cpf) {
                return res.status(400).json({ mensagem: "Os campos nome, email e cpf são obrigatórios." });
            }
            const sucesso = await Usuario.atualizarUsuario(Number(idUsuario), dados);
            if (sucesso) return res.status(200).json({ mensagem: "Usuário atualizado com sucesso." });
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao atualizar usuário." });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const { idUsuario } = req.params;
            const sucesso = await Usuario.removerUsuario(Number(idUsuario));
            if (sucesso) return res.status(200).json({ mensagem: "Usuário removido com sucesso." });
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao remover usuário." });
        }
    }
}

export default UsuarioController;