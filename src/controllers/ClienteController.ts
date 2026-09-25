// src/controllers/ClienteController.ts
import { Request, Response, NextFunction } from 'express';
import { ClienteService } from '../services/ClienteService';

export class ClienteController {
    private clienteService = new ClienteService();

    criar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const cliente = await this.clienteService.criar(req.body);
            res.status(201).json(cliente);
        } catch (err) {
            next(err);
        }
    };

    listar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const clientes = await this.clienteService.listar();
            res.status(200).json(clientes);
        } catch (err) {
            next(err);
        }
    };

    buscarPorId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const cliente = await this.clienteService.buscarPorId(Number(req.params.id));
            res.status(200).json(cliente);
        } catch (err) {
            next(err);
        }
    };

    atualizar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const cliente = await this.clienteService.atualizar(Number(req.params.id), req.body);
            res.status(200).json(cliente);
        } catch (err) {
            next(err);
        }
    };

    remover = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.clienteService.remover(Number(req.params.id));
            res.status(200).json({ mensagem: 'Cliente removido com sucesso' });
        } catch (err) {
            next(err);
        }
    };
}
