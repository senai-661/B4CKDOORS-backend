// src/controller/UsuarioController.ts
import type { Request, Response } from "express";
import { Usuario } from "../model/Usuario.js";
import { HttpError, tratarErro } from "../utils/HttpError.js";
import { gerarHash } from "../utils/senha.js";
import * as v from "../utils/validacao.js";

class UsuarioController {
    /** GET /api/usuarios (admin) */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json(await Usuario.listarUsuarios());
        } catch (error) {
            return tratarErro(res, error, "Erro ao listar usuários");
        }
    }

    /** GET /api/usuarios/:idUsuario (admin ou o próprio usuário) */
    static async usuario(req: Request, res: Response): Promise<Response> {
        try {
            const id = v.idDaRota(req, "idUsuario");
            if (req.usuario?.role !== "admin" && req.usuario?.id !== id) {
                throw new HttpError(403, "Acesso negado a este usuário.");
            }
            const usuario = await Usuario.buscarUsuario(id);
            if (!usuario) throw new HttpError(404, "Usuário não encontrado.");
            return res.status(200).json(usuario);
        } catch (error) {
            return tratarErro(res, error, "Erro ao buscar usuário");
        }
    }

    /**
     * POST /api/usuarios (público = cadastro de cliente)
     * A role é SEMPRE "cliente", exceto quando quem chama é um admin autenticado.
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const d = v.corpo(req);
            const role: v.Role = req.usuario?.role === "admin" && d.role !== undefined ? v.role(d.role) : "cliente";
            const usuario = await Usuario.cadastrarUsuario({
                nome: v.texto(d.nome, "nome", 100),
                email: v.email(d.email),
                cpf: v.cpf(d.cpf),
                senhaHash: await gerarHash(v.senha(d.senha)),
                role,
            });
            return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso.", usuario });
        } catch (error) {
            return tratarErro(res, error, "Erro ao cadastrar usuário");
        }
    }

    /** PUT /api/usuarios/:idUsuario (admin ou o próprio usuário) */
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id = v.idDaRota(req, "idUsuario");
            const ehAdmin = req.usuario?.role === "admin";
            if (!ehAdmin && req.usuario?.id !== id) throw new HttpError(403, "Acesso negado a este usuário.");

            const d = v.corpo(req);
            if (!ehAdmin && d.role !== undefined) {
                throw new HttpError(403, "Apenas administradores podem alterar o perfil de acesso.");
            }

            const atual = await Usuario.buscarUsuario(id);
            if (!atual) throw new HttpError(404, "Usuário não encontrado.");

            const novaRole = d.role !== undefined ? v.role(d.role) : null;
            if (atual.role === "admin" && novaRole === "cliente" && (await Usuario.contarAdmins()) <= 1) {
                throw new HttpError(409, "Não é possível rebaixar o único administrador do sistema.");
            }

            const atualizado = await Usuario.atualizarUsuario(id, {
                nome: v.texto(d.nome, "nome", 100),
                email: v.email(d.email),
                cpf: v.cpf(d.cpf),
                role: novaRole,
                // senha é opcional na edição: vazia/ausente mantém a atual
                senhaHash: d.senha === undefined || d.senha === "" ? null : await gerarHash(v.senha(d.senha)),
            });
            if (!atualizado) throw new HttpError(404, "Usuário não encontrado.");
            return res.status(200).json({ mensagem: "Usuário atualizado com sucesso.", usuario: atualizado });
        } catch (error) {
            return tratarErro(res, error, "Erro ao atualizar usuário");
        }
    }

    /** DELETE /api/usuarios/:idUsuario (admin) */
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const id = v.idDaRota(req, "idUsuario");
            if (req.usuario?.id === id) throw new HttpError(409, "Você não pode excluir a própria conta.");

            const alvo = await Usuario.buscarUsuario(id);
            if (!alvo) throw new HttpError(404, "Usuário não encontrado.");
            if (alvo.role === "admin" && (await Usuario.contarAdmins()) <= 1) {
                throw new HttpError(409, "Não é possível excluir o único administrador do sistema.");
            }
            await Usuario.removerUsuario(id);
            return res.status(200).json({ mensagem: "Usuário removido com sucesso." });
        } catch (error) {
            return tratarErro(res, error, "Erro ao remover usuário");
        }
    }
}

export default UsuarioController;
