// src/controller/PerfilController.ts
import type { Request, Response } from "express";
import { Usuario } from "../model/Usuario.js";
import type { UsuarioDTO } from "../interface/UsuarioDTO.js";

/**
 * Endpoints para a tela "Meu perfil" (PPerfil) do frontend — sempre operam
 * sobre o usuário autenticado (req.usuario, preenchido pelo Auth.verifyToken),
 * nunca sobre um id arbitrário vindo da URL.
 */
class PerfilController {

    static async meuPerfil(req: Request, res: Response): Promise<void> {
        try {
            if (!req.usuario) {
                res.status(401).json({ mensagem: "Não autenticado." });
                return;
            }
            const usuario = await Usuario.buscarUsuario(req.usuario.idUsuario);
            if (!usuario) {
                res.status(404).json({ mensagem: "Usuário não encontrado." });
                return;
            }
            const { senha, ...perfil } = usuario;
            res.status(200).json(perfil);
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao buscar perfil." });
        }
    }

    static async atualizarMeuPerfil(req: Request, res: Response): Promise<void> {
        try {
            if (!req.usuario) {
                res.status(401).json({ mensagem: "Não autenticado." });
                return;
            }

            const dados: Partial<UsuarioDTO> = req.body;
            if (dados.nome !== undefined && !dados.nome.trim()) {
                res.status(400).json({ mensagem: "O nome não pode ficar vazio." });
                return;
            }
            if (dados.email !== undefined && !dados.email.trim()) {
                res.status(400).json({ mensagem: "O e-mail não pode ficar vazio." });
                return;
            }

            const sucesso = await Usuario.atualizarPerfil(req.usuario.idUsuario, dados);
            if (!sucesso) {
                res.status(404).json({ mensagem: "Usuário não encontrado." });
                return;
            }

            const usuario = await Usuario.buscarUsuario(req.usuario.idUsuario);
            const { senha, ...perfil } = usuario ?? {};
            res.status(200).json(perfil);
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao atualizar perfil." });
        }
    }
}

export default PerfilController;
