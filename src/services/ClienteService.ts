// src/services/ClienteService.ts
import bcrypt from 'bcrypt';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { ClienteCreateDTO, ClienteResponseDTO } from '../models/Cliente';
import { AppError } from '../middlewares/errorHandler';

const SALT_ROUNDS = 10;

function paraResponseDTO(cliente: {
    id: number;
    nome: string;
    email: string;
    criado_em: Date;
}): ClienteResponseDTO {
    return {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        criado_em: cliente.criado_em,
    };
}

export class ClienteService {
    private clienteRepository = new ClienteRepository();

    async criar(dados: ClienteCreateDTO): Promise<ClienteResponseDTO> {
        if (!dados.nome || !dados.email || !dados.senha) {
            throw new AppError('Nome, e-mail e senha são obrigatórios', 400);
        }

        const existente = await this.clienteRepository.buscarPorEmail(dados.email);
        if (existente) {
            throw new AppError('E-mail já cadastrado', 409);
        }

        const senhaHash = await bcrypt.hash(dados.senha, SALT_ROUNDS);
        const cliente = await this.clienteRepository.criar(dados, senhaHash);
        return paraResponseDTO(cliente);
    }

    async listar(): Promise<ClienteResponseDTO[]> {
        const clientes = await this.clienteRepository.listarTodos();
        return clientes.map(paraResponseDTO);
    }

    async buscarPorId(id: number): Promise<ClienteResponseDTO> {
        const cliente = await this.clienteRepository.buscarPorId(id);
        if (!cliente) {
            throw new AppError('Cliente não encontrado', 404);
        }
        return paraResponseDTO(cliente);
    }

    async atualizar(id: number, dados: Partial<ClienteCreateDTO>): Promise<ClienteResponseDTO> {
        const clienteExistente = await this.clienteRepository.buscarPorId(id);
        if (!clienteExistente) {
            throw new AppError('Cliente não encontrado', 404);
        }

        if (dados.email && dados.email !== clienteExistente.email) {
            const emailEmUso = await this.clienteRepository.buscarPorEmail(dados.email);
            if (emailEmUso) {
                throw new AppError('E-mail já cadastrado', 409);
            }
        }

        const atualizacoes: Partial<ClienteCreateDTO> = { ...dados };
        if (dados.senha) {
            atualizacoes.senha = await bcrypt.hash(dados.senha, SALT_ROUNDS);
        }

        const cliente = await this.clienteRepository.atualizar(id, atualizacoes);
        return paraResponseDTO(cliente!);
    }

    async remover(id: number): Promise<void> {
        const removido = await this.clienteRepository.remover(id);
        if (!removido) {
            throw new AppError('Cliente não encontrado', 404);
        }
    }
}
