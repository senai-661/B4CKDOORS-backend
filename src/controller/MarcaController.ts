// src/controller/MarcaController.ts
import type { Request, Response } from "express";
import Marca from "../model/Marca.js";
import type { MarcaDTO } from "../interface/MarcaDTO.js";

class MarcaController {

    static async todos(req: Request, res: Response): Promise<void> {
        try {
            const lista = await Marca.listarMarcas();
            if (lista === null) { res.status(500).json({ mensagem: "Erro ao listar marcas." }); return; }
            res.status(200).json(lista);
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao listar marcas." });
        }
    }

    static async marca(req: Request, res: Response): Promise<void> {
        try {
            const marca = await Marca.buscarMarca(Number(req.params.idMarca));
            if (!marca) { res.status(404).json({ mensagem: "Marca não encontrada." }); return; }
            res.status(200).json(marca);
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao buscar marca." });
        }
    }

    static async nova(req: Request, res: Response): Promise<void> {
        try {
            const dados: MarcaDTO = req.body;
            if (!dados?.nome || !String(dados.nome).trim()) {
                res.status(400).json({ mensagem: "Campo obrigatório: nome." });
                return;
            }
            const resultado = await Marca.cadastrarMarca(dados);
            if (resultado === true)       { res.status(201).json({ mensagem: "Marca cadastrada com sucesso." }); return; }
            if (resultado === "duplicada") { res.status(409).json({ mensagem: "Essa marca já existe." }); return; }
            res.status(400).json({ mensagem: "Erro ao cadastrar marca." });
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao cadastrar marca." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const dados: MarcaDTO = req.body;
            if (!dados?.nome || !String(dados.nome).trim()) {
                res.status(400).json({ mensagem: "Campo obrigatório: nome." });
                return;
            }
            const resultado = await Marca.atualizarMarca(Number(req.params.idMarca), dados);
            if (resultado === true)        { res.status(200).json({ mensagem: "Marca atualizada com sucesso." }); return; }
            if (resultado === "duplicada") { res.status(409).json({ mensagem: "Essa marca já existe." }); return; }
            if (resultado === null)        { res.status(404).json({ mensagem: "Marca não encontrada." }); return; }
            res.status(400).json({ mensagem: "Erro ao atualizar marca." });
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao atualizar marca." });
        }
    }

    static async remover(req: Request, res: Response): Promise<void> {
        try {
            const sucesso = await Marca.removerMarca(Number(req.params.idMarca));
            if (sucesso) { res.status(200).json({ mensagem: "Marca removida com sucesso." }); return; }
            res.status(404).json({ mensagem: "Marca não encontrada." });
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao remover marca." });
        }
    }
}

export default MarcaController;
