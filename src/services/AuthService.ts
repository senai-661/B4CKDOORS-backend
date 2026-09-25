// src/services/AuthService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { AppError } from '../middlewares/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_padrao';
const JWT_EXPIRES_IN = '8h';

export class AuthService {
    private clienteRepository = new ClienteRepository();

    async login(email: string, senha: string): Promise<{ token: string }> {
        if (!email || !senha) {
            throw new AppError('E-mail e senha são obrigatórios', 400);
        }

        const cliente = await this.clienteRepository.buscarPorEmail(email);

        if (!cliente) {
            throw new AppError('Credenciais inválidas', 401);
        }

        const senhaValida = await bcrypt.compare(senha, cliente.senha);

        if (!senhaValida) {
            throw new AppError('Credenciais inválidas', 401);
        }

        const token = jwt.sign(
            { id: cliente.id, email: cliente.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return { token };
    }
}
