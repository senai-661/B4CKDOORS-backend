// src/repositories/VendaRepository.ts
import pool from '../config/database';
import { VendaCreateDTO, VendaDetalhada } from '../models/Venda';

export class VendaRepository {
    async registrarVenda(dados: VendaCreateDTO): Promise<void> {
        await pool.query(`CALL sp_registrar_venda($1, $2, $3)`, [
            dados.cliente_id,
            dados.produto_id,
            dados.quantidade,
        ]);
    }

    async listarDetalhadas(): Promise<VendaDetalhada[]> {
        const result = await pool.query(`SELECT * FROM vw_vendas_detalhadas`);
        return result.rows;
    }

    async listarDetalhadasPorCliente(clienteId: number): Promise<VendaDetalhada[]> {
        const result = await pool.query(
            `SELECT * FROM vw_vendas_detalhadas WHERE cliente_id = $1`,
            [clienteId]
        );
        return result.rows;
    }
}
