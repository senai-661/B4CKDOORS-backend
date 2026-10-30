// src/controller/CategoriaController.ts
import type { Request, Response } from "express";
import { Categoria } from "../model/Categoria.js";
import { HttpError, tratarErro } from "../utils/HttpError.js";
import * as v from "../utils/validacao.js";

class CategoriaController {
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json(await Categoria.listarCategorias());
        } catch (error) {
            return tratarErro(res, error, "Erro ao listar categorias");
        }
    }

    static async categoria(req: Request, res: Response): Promise<Response> {
        try {
            const categoria = await Categoria.buscarCategoria(v.idDaRota(req, "idCategoria"));
            if (!categoria) throw new HttpError(404, "Categoria não encontrada.");
            return res.status(200).json(categoria);
        } catch (error) {
            return tratarErro(res, error, "Erro ao buscar categoria");
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const categoria = await Categoria.cadastrarCategoria(v.texto(v.corpo(req).nome, "nome", 100));
            return res.status(201).json({ mensagem: "Categoria cadastrada com sucesso.", categoria });
        } catch (error) {
            return tratarErro(res, error, "Erro ao cadastrar categoria");
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id = v.idDaRota(req, "idCategoria");
            const categoria = await Categoria.atualizarCategoria(id, v.texto(v.corpo(req).nome, "nome", 100));
            if (!categoria) throw new HttpError(404, "Categoria não encontrada.");
            return res.status(200).json({ mensagem: "Categoria atualizada com sucesso.", categoria });
        } catch (error) {
            return tratarErro(res, error, "Erro ao atualizar categoria");
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const removida = await Categoria.removerCategoria(v.idDaRota(req, "idCategoria"));
            if (!removida) throw new HttpError(404, "Categoria não encontrada.");
            return res.status(200).json({ mensagem: "Categoria removida com sucesso." });
        } catch (error) {
            return tratarErro(res, error, "Erro ao remover categoria");
        }
    }
}

export default CategoriaController;
