// src/services/ProdutoService.ts
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { Produto, ProdutoCreateDTO, ProdutoUpdateDTO } from '../models/Produto';
import { AppError } from '../middlewares/errorHandler';

export class ProdutoService {
    private produtoRepository = new ProdutoRepository();

    async criar(dados: ProdutoCreateDTO): Promise<Produto> {
        if (!dados.nome) {
            throw new AppError('Nome é obrigatório', 400);
        }

        if (dados.preco === undefined || dados.preco <= 0) {
            throw new AppError('Preço deve ser maior que zero', 400);
        }

        if (dados.estoque === undefined || dados.estoque < 0) {
            throw new AppError('Estoque não pode ser negativo', 400);
        }

        return this.produtoRepository.criar(dados);
    }

    async listar(): Promise<Produto[]> {
        return this.produtoRepository.listarTodos();
    }

    async buscarPorId(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.buscarPorId(id);
        if (!produto) {
            throw new AppError('Produto não encontrado', 404);
        }
        return produto;
    }

    async atualizar(id: number, dados: ProdutoUpdateDTO): Promise<Produto> {
        const existente = await this.produtoRepository.buscarPorId(id);
        if (!existente) {
            throw new AppError('Produto não encontrado', 404);
        }

        if (dados.preco !== undefined && dados.preco <= 0) {
            throw new AppError('Preço deve ser maior que zero', 400);
        }

        if (dados.estoque !== undefined && dados.estoque < 0) {
            throw new AppError('Estoque não pode ser negativo', 400);
        }

        const produto = await this.produtoRepository.atualizar(id, dados);
        return produto!;
    }

    async remover(id: number): Promise<void> {
        const removido = await this.produtoRepository.remover(id);
        if (!removido) {
            throw new AppError('Produto não encontrado', 404);
        }
    }
}
