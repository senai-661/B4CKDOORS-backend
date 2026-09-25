// src/controllers/ProdutoController.ts
import { Request, Response, NextFunction } from 'express';
import { ProdutoService } from '../services/ProdutoService';

export class ProdutoController {
    private produtoService = new ProdutoService();

    criar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const produto = await this.produtoService.criar(req.body);
            res.status(201).json(produto);
        } catch (err) {
            next(err);
        }
    };

    listar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const produtos = await this.produtoService.listar();
            res.status(200).json(produtos);
        } catch (err) {
            next(err);
        }
    };

    buscarPorId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const produto = await this.produtoService.buscarPorId(Number(req.params.id));
            res.status(200).json(produto);
        } catch (err) {
            next(err);
        }
    };

    atualizar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const produto = await this.produtoService.atualizar(Number(req.params.id), req.body);
            res.status(200).json(produto);
        } catch (err) {
            next(err);
        }
    };

    remover = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.produtoService.remover(Number(req.params.id));
            res.status(200).json({ mensagem: 'Produto removido com sucesso' });
        } catch (err) {
            next(err);
        }
    };
}
