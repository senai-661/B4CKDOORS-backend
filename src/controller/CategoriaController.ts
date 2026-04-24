// src/controller/CategoriaController.ts
import type { Request, Response } from "express";
import Categoria from "../model/Categoria.js"; // Importando como default
import type { CategoriaDTO } from "../interface/CategoriaDTO.js";

class CategoriaController {

<<<<<<< Updated upstream
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const lista = await Categoria.listarCategorias();
            if (lista === null) return res.status(500).json({ mensagem: "Erro ao listar categorias." });
            return res.status(200).json(lista);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao listar categorias." });
=======
    // Ajustado para Promise<void> conforme o padrão do projeto
    static async todos(req: Request, res: Response): Promise<void> {
        try {
            const lista = await Categoria.listarCategorias();
            if (lista === null) {
                res.status(500).json({ mensagem: "Erro ao listar categorias." });
                return;
            }
            res.status(200).json(lista);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro interno ao listar categorias." });
>>>>>>> Stashed changes
        }
        return;
    }

    static async categoria(req: Request, res: Response): Promise<Response> {
        try {
            const { idCategoria } = req.params;
            const categoria = await Categoria.buscarCategoria(Number(idCategoria));
<<<<<<< Updated upstream
            if (!categoria) return res.status(404).json({ mensagem: "Categoria não encontrada." });
            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao buscar categoria." });
=======
            if (!categoria) {
                res.status(404).json({ mensagem: "Categoria não encontrada." });
                return;
            }
            res.status(200).json(categoria);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro interno ao buscar categoria." });
>>>>>>> Stashed changes
        }
        return;
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dados: CategoriaDTO = req.body;
            if (!dados.nome) return res.status(400).json({ mensagem: "O campo nome é obrigatório." });
            const sucesso = await Categoria.cadastrarCategoria(dados);
<<<<<<< Updated upstream
            if (sucesso) return res.status(201).json({ mensagem: "Categoria cadastrada com sucesso." });
            return res.status(400).json({ mensagem: "Erro ao cadastrar categoria." });
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao cadastrar categoria." });
=======
            if (sucesso) {
                res.status(201).json({ mensagem: "Categoria cadastrada com sucesso." });
                return;
            }
            res.status(400).json({ mensagem: "Erro ao cadastrar categoria." });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro interno ao cadastrar categoria." });
>>>>>>> Stashed changes
        }
        return;
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { idCategoria } = req.params;
            const dados: CategoriaDTO = req.body;
            if (!dados.nome) return res.status(400).json({ mensagem: "O campo nome é obrigatório." });
            const sucesso = await Categoria.atualizarCategoria(Number(idCategoria), dados);
<<<<<<< Updated upstream
            if (sucesso) return res.status(200).json({ mensagem: "Categoria atualizada com sucesso." });
            return res.status(404).json({ mensagem: "Categoria não encontrada." });
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao atualizar categoria." });
=======
            if (sucesso) {
                res.status(200).json({ mensagem: "Categoria atualizada com sucesso." });
                return;
            }
            res.status(404).json({ mensagem: "Categoria não encontrada." });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro interno ao atualizar categoria." });
>>>>>>> Stashed changes
        }
        return;
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const { idCategoria } = req.params;
            const sucesso = await Categoria.removerCategoria(Number(idCategoria));
<<<<<<< Updated upstream
            if (sucesso) return res.status(200).json({ mensagem: "Categoria removida com sucesso." });
            return res.status(404).json({ mensagem: "Categoria não encontrada." });
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno ao remover categoria." });
=======
            if (sucesso) {
                res.status(200).json({ mensagem: "Categoria removida com sucesso." });
                return;
            }
            res.status(404).json({ mensagem: "Categoria não encontrada." });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro interno ao remover categoria." });
>>>>>>> Stashed changes
        }
        return;
    }
}

export default CategoriaController;