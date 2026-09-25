// src/models/Venda.ts

export interface Venda {
    id: number;
    cliente_id: number;
    produto_id: number;
    quantidade: number;
    subtotal: number;
    desconto: number;
    total: number;
    data_venda: Date;
}

export interface VendaCreateDTO {
    cliente_id: number;
    produto_id: number;
    quantidade: number;
}

export interface VendaDetalhada {
    id: number;
    cliente_id: number;
    cliente_nome: string;
    produto_id: number;
    produto_nome: string;
    cod_produto: string;
    quantidade: number;
    subtotal: number;
    desconto: number;
    total: number;
    data_venda: Date;
}
