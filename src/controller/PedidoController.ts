// src/controller/PedidoController.ts
import type { Request, Response } from "express";
import { Pedido } from "../model/Pedido.js";
import { HttpError, tratarErro } from "../utils/HttpError.js";
import * as v from "../utils/validacao.js";

function lerItens(valor: unknown): { idProduto: number; quantidade: number }[] {
    if (!Array.isArray(valor) || valor.length === 0 || valor.length > 100) {
        throw new HttpError(400, "O campo itens deve ser uma lista com 1 a 100 itens.");
    }
    return valor.map((it: unknown) => {
        const o = (typeof it === "object" && it !== null ? it : {}) as Record<string, unknown>;
        return {
            idProduto: v.inteiro(o.idProduto, "itens.idProduto", 1, 2_147_483_647),
            quantidade: v.inteiro(o.quantidade, "itens.quantidade", 1, 1000),
        };
    });
}

class PedidoController {
    /** GET /api/pedidos : admin vê todos; cliente vê apenas os próprios. */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const u = req.usuario;
            if (!u) throw new HttpError(401, "Token não informado.");
            const lista = u.role === "admin" ? await Pedido.listarPedidos() : await Pedido.listarPedidos(u.id);
            return res.status(200).json(lista);
        } catch (error) {
            return tratarErro(res, error, "Erro ao listar pedidos");
        }
    }

    /** GET /api/pedidos/:idPedido : admin ou dono do pedido. */
    static async pedido(req: Request, res: Response): Promise<Response> {
        try {
            const u = req.usuario;
            if (!u) throw new HttpError(401, "Token não informado.");
            const pedido = await Pedido.buscarPedido(v.idDaRota(req, "idPedido"));
            if (!pedido) throw new HttpError(404, "Pedido não encontrado.");
            if (u.role !== "admin" && pedido.idUsuario !== u.id) throw new HttpError(403, "Acesso negado a este pedido.");
            return res.status(200).json(pedido);
        } catch (error) {
            return tratarErro(res, error, "Erro ao buscar pedido");
        }
    }

    /**
     * POST /api/pedidos
     *  - Com `itens`: qualquer usuário autenticado. O total vem do banco, não do cliente.
     *    Cliente só compra para si mesmo; admin pode informar `idUsuario`.
     *  - Sem `itens` (pedido manual com valorTotal): somente admin.
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const u = req.usuario;
            if (!u) throw new HttpError(401, "Token não informado.");
            const d = v.corpo(req);
            const ehAdmin = u.role === "admin";
            const idUsuario = ehAdmin && d.idUsuario !== undefined ? v.inteiro(d.idUsuario, "idUsuario", 1, 2_147_483_647) : u.id;

            if (d.itens !== undefined) {
                const pedido = await Pedido.cadastrarPedidoComItens(idUsuario, lerItens(d.itens));
                return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso.", pedido });
            }

            if (!ehAdmin) throw new HttpError(400, "Informe os itens do pedido.");
            const status = d.status === undefined ? "PENDENTE" : v.statusPedido(d.status);
            const pedido = await Pedido.cadastrarPedido(idUsuario, v.numero(d.valorTotal ?? d.total, "valorTotal"), status);
            return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso.", pedido });
        } catch (error) {
            return tratarErro(res, error, "Erro ao cadastrar pedido");
        }
    }

    /** PUT /api/pedidos/:idPedido (admin) */
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id = v.idDaRota(req, "idPedido");
            const d = v.corpo(req);
            const bruto = d.valorTotal ?? d.total;
            const pedido = await Pedido.atualizarPedido(
                id,
                bruto === undefined ? null : v.numero(bruto, "valorTotal"),
                v.statusPedido(d.status)
            );
            if (!pedido) throw new HttpError(404, "Pedido não encontrado.");
            return res.status(200).json({ mensagem: "Pedido atualizado com sucesso.", pedido });
        } catch (error) {
            return tratarErro(res, error, "Erro ao atualizar pedido");
        }
    }

    /** DELETE /api/pedidos/:idPedido (admin) */
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const removido = await Pedido.removerPedido(v.idDaRota(req, "idPedido"));
            if (!removido) throw new HttpError(404, "Pedido não encontrado.");
            return res.status(200).json({ mensagem: "Pedido removido com sucesso." });
        } catch (error) {
            return tratarErro(res, error, "Erro ao remover pedido");
        }
    }
}

export default PedidoController;
