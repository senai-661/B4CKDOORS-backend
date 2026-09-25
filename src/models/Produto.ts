// src/models/Produto.ts

export interface Produto {
    id: number;
    cod_produto: string;
    nome: string;
    preco: number;
    estoque: number;
    criado_em: Date;
}

export interface ProdutoCreateDTO {
    nome: string;
    preco: number;
    estoque: number;
}

export interface ProdutoUpdateDTO {
    nome?: string;
    preco?: number;
    estoque?: number;
}
