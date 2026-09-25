// src/models/Cliente.ts

export interface Cliente {
    id: number;
    nome: string;
    email: string;
    senha: string;
    criado_em: Date;
}

export interface ClienteCreateDTO {
    nome: string;
    email: string;
    senha: string;
}

export interface ClienteResponseDTO {
    id: number;
    nome: string;
    email: string;
    criado_em: Date;
}
