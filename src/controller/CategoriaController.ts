import type { Request, Response } from "express";
import { Categoria } from "../model/Categoria.js";
import type { CategoriaDTO } from "../interface/CategoriaDTO.js";

class CategoriaController {

    static async todos(req: Request, res: Response): Promise<void> {
        try {
            const lista = await Categoria.listarCategorias();
            if (lista === null) {
                res.status(500).json({ mensagem: "Erro ao listar categorias." });
                return;
            }
            res.status(200).json(lista);
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao listar categorias." });
        }
    }

    static async categoria(req: Request, res: Response): Promise<void> {
        try {
            const { idCategoria } = req.params;
            const categoria = await Categoria.buscarCategoria(Number(idCategoria));
            if (!categoria) {
                res.status(404).json({ mensagem: "Categoria não encontrada." });
                return;
            }
            res.status(200).json(categoria);
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao buscar categoria." });
        }
    }

    static async novo(req: Request, res: Response): Promise<void> {
        try {
            const dados: CategoriaDTO = req.body;
            if (!dados.nome) {
                res.status(400).json({ mensagem: "O campo nome é obrigatório." });
                return;
            }
            const sucesso = await Categoria.cadastrarCategoria(dados);
            if (sucesso) {
                res.status(201).json({ mensagem: "Categoria cadastrada com sucesso." });
                return;
            }
            res.status(400).json({ mensagem: "Erro ao cadastrar categoria." });
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao cadastrar categoria." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { idCategoria } = req.params;
            const dados: CategoriaDTO = req.body;
            if (!dados.nome) {
                res.status(400).json({ mensagem: "O campo nome é obrigatório." });
                return;
            }
            const sucesso = await Categoria.atualizarCategoria(Number(idCategoria), dados);
            if (sucesso) {
                res.status(200).json({ mensagem: "Categoria atualizada com sucesso." });
                return;
            }
            res.status(404).json({ mensagem: "Categoria não encontrada." });
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao atualizar categoria." });
        }
    }

    static async remover(req: Request, res: Response): Promise<void> {
        try {
            const { idCategoria } = req.params;
            const sucesso = await Categoria.removerCategoria(Number(idCategoria));
            if (sucesso) {
                res.status(200).json({ mensagem: "Categoria removida com sucesso." });
                return;
            }
            res.status(404).json({ mensagem: "Categoria não encontrada." });
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao remover categoria." });
        }
    }
}

export default CategoriaController;