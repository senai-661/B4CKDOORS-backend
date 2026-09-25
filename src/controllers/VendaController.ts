// src/controllers/VendaController.ts
import { Request, Response, NextFunction } from 'express';
import { VendaService } from '../services/VendaService';

export class VendaController {
    private vendaService = new VendaService();

    registrar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const resultado = await this.vendaService.registrar(req.body);
            res.status(201).json(resultado);
        } catch (err) {
            next(err);
        }
    };

    listar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const vendas = await this.vendaService.listarTodas();
            res.status(200).json(vendas);
        } catch (err) {
            next(err);
        }
    };

    listarPorCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const vendas = await this.vendaService.listarPorCliente(Number(req.params.clienteId));
            res.status(200).json(vendas);
        } catch (err) {
            next(err);
        }
    };
}
