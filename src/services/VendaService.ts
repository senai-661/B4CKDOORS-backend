// src/services/VendaService.ts
import { VendaRepository } from '../repositories/VendaRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { VendaCreateDTO, VendaDetalhada } from '../models/Venda';
import { AppError } from '../middlewares/errorHandler';

const PERCENTUAL_DESCONTO = 0.10;
const LIMITE_DESCONTO = 200.0;

export class VendaService {
    private vendaRepository = new VendaRepository();
    private produtoRepository = new ProdutoRepository();
    private clienteRepository = new ClienteRepository();

    async registrar(dados: VendaCreateDTO): Promise<{
        subtotal: number;
        desconto: number;
        total: number;
    }> {
        if (!dados.cliente_id || !dados.produto_id || !dados.quantidade) {
            throw new AppError('cliente_id, produto_id e quantidade são obrigatórios', 400);
        }

        if (dados.quantidade <= 0) {
            throw new AppError('Quantidade deve ser maior que zero', 400);
        }

        const cliente = await this.clienteRepository.buscarPorId(dados.cliente_id);
        if (!cliente) {
            throw new AppError('Cliente não encontrado', 404);
        }

        const produto = await this.produtoRepository.buscarPorId(dados.produto_id);
        if (!produto) {
            throw new AppError('Produto não encontrado', 404);
        }

        if (produto.estoque < dados.quantidade) {
            throw new AppError('Estoque insuficiente', 400);
        }

        const subtotal = Number(produto.preco) * dados.quantidade;
        const desconto = subtotal >= LIMITE_DESCONTO ? subtotal * PERCENTUAL_DESCONTO : 0;
        const total = subtotal - desconto;

        await this.vendaRepository.registrarVenda(dados);

        return { subtotal, desconto, total };
    }

    async listarTodas(): Promise<VendaDetalhada[]> {
        return this.vendaRepository.listarDetalhadas();
    }

    async listarPorCliente(clienteId: number): Promise<VendaDetalhada[]> {
        return this.vendaRepository.listarDetalhadasPorCliente(clienteId);
    }
}
