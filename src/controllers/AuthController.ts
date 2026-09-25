// src/controllers/AuthController.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService = new AuthService();

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, senha } = req.body;
            const resultado = await this.authService.login(email, senha);
            res.status(200).json(resultado);
        } catch (err) {
            next(err);
        }
    };
}
