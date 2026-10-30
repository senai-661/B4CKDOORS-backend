// src/controller/ProdutoController.ts
import type { Request, Response } from "express";
import { Produto } from "../model/Produto.js";
import type { ProdutoDTO } from "../interface/ProdutoDTO.js";
import { HttpError, tratarErro } from "../utils/HttpError.js";
import * as v from "../utils/validacao.js";

function lerProduto(req: Request): ProdutoDTO {
    const d = v.corpo(req);
    return {
        nome: v.texto(d.nome, "nome", 150),
        descricao: v.textoOpcional(d.descricao, "descricao", 2000),
        preco: v.numero(d.preco, "preco"),
        estoque: v.inteiro(d.estoque, "estoque", 0),
        imagem: v.textoOpcional(d.imagem, "imagem", 500),
        idCategoria: v.inteiro(d.idCategoria, "idCategoria", 1, 2_147_483_647),
    };
}

class ProdutoController {
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json(await Produto.listarProdutos());
        } catch (error) {
            return tratarErro(res, error, "Erro ao listar produtos");
        }
    }

    static async produto(req: Request, res: Response): Promise<Response> {
        try {
            const produto = await Produto.buscarProduto(v.idDaRota(req, "idProduto"));
            if (!produto) throw new HttpError(404, "Produto não encontrado.");
            return res.status(200).json(produto);
        } catch (error) {
            return tratarErro(res, error, "Erro ao buscar produto");
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const produto = await Produto.cadastrarProduto(lerProduto(req));
            return res.status(201).json({ mensagem: "Produto cadastrado com sucesso.", produto });
        } catch (error) {
            return tratarErro(res, error, "Erro ao cadastrar produto");
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id = v.idDaRota(req, "idProduto");
            const produto = await Produto.atualizarProduto(id, lerProduto(req));
            if (!produto) throw new HttpError(404, "Produto não encontrado.");
            return res.status(200).json({ mensagem: "Produto atualizado com sucesso.", produto });
        } catch (error) {
            return tratarErro(res, error, "Erro ao atualizar produto");
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const removido = await Produto.removerProduto(v.idDaRota(req, "idProduto"));
            if (!removido) throw new HttpError(404, "Produto não encontrado.");
            return res.status(200).json({ mensagem: "Produto removido com sucesso." });
        } catch (error) {
            return tratarErro(res, error, "Erro ao remover produto");
        }
    }
}

export default ProdutoController;
