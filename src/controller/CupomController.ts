import type { Request, Response } from "express";
import { Cupom } from "../model/Cupom.js";
import type { CupomDTO } from "../interface/CupomDTO.js";

class CupomController {

    static async todos(req: Request, res: Response): Promise<void> {
        try {
            const lista = await Cupom.listarCupons();
            if (lista === null) {
                res.status(500).json({ mensagem: "Erro ao listar cupons." });
                return;
            }
            res.status(200).json(lista);
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao listar cupons." });
        }
    }

    static async cupom(req: Request, res: Response): Promise<void> {
        try {
            const idCupom = String(req.params["idCupom"] ?? "");
            const cupom = await Cupom.buscarCupom(Number(idCupom));
            if (!cupom) {
                res.status(404).json({ mensagem: "Cupom não encontrado." });
                return;
            }
            res.status(200).json(cupom);
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao buscar cupom." });
        }
    }

    static async validar(req: Request, res: Response): Promise<void> {
        try {
            const codigo = String(req.params["codigo"] ?? "");
            const cupom = await Cupom.buscarPorCodigo(codigo);
            if (!cupom) {
                res.status(404).json({ mensagem: "Cupom inválido ou inativo." });
                return;
            }
            res.status(200).json(cupom);
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao validar cupom." });
        }
    }

    static async novo(req: Request, res: Response): Promise<void> {
        try {
            const dados: CupomDTO = req.body;
            if (!dados.codigo || dados.desconto === undefined || dados.ativo === undefined) {
                res.status(400).json({ mensagem: "Campos obrigatórios: codigo, desconto, ativo." });
                return;
            }
            const sucesso = await Cupom.cadastrarCupom(dados);
            if (sucesso) {
                res.status(201).json({ mensagem: "Cupom cadastrado com sucesso." });
                return;
            }
            res.status(400).json({ mensagem: "Erro ao cadastrar cupom." });
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao cadastrar cupom." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const idCupom = String(req.params["idCupom"] ?? "");
            const dados: CupomDTO = req.body;
            if (!dados.codigo || dados.desconto === undefined || dados.ativo === undefined) {
                res.status(400).json({ mensagem: "Campos obrigatórios: codigo, desconto, ativo." });
                return;
            }
            const sucesso = await Cupom.atualizarCupom(Number(idCupom), dados);
            if (sucesso) {
                res.status(200).json({ mensagem: "Cupom atualizado com sucesso." });
                return;
            }
            res.status(404).json({ mensagem: "Cupom não encontrado." });
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao atualizar cupom." });
        }
    }

    static async remover(req: Request, res: Response): Promise<void> {
        try {
            const idCupom = String(req.params["idCupom"] ?? "");
            const sucesso = await Cupom.removerCupom(Number(idCupom));
            if (sucesso) {
                res.status(200).json({ mensagem: "Cupom removido com sucesso." });
                return;
            }
            res.status(404).json({ mensagem: "Cupom não encontrado." });
        } catch {
            res.status(500).json({ mensagem: "Erro interno ao remover cupom." });
        }
    }
}

export default CupomController;