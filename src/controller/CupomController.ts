// src/controller/CupomController.ts
import type { Request, Response } from "express";

const listarCupons = (req: Request, res: Response) => {
  res.json({ mensagem: "Lista de cupons" });
};

const criarCupom = (req: Request, res: Response) => {
  res.json({
    mensagem: "Cupom criado",
    dados: req.body
  });
};

const buscarCupomPorId = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    mensagem: "Cupom encontrado",
    id
  });
};

const atualizarCupom = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    mensagem: "Cupom atualizado",
    id,
    dados: req.body
  });
};

const deletarCupom = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    mensagem: "Cupom deletado",
    id
  });
};

export default {
  listarCupons,
  criarCupom,
  buscarCupomPorId,
  atualizarCupom,
  deletarCupom
};