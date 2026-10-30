// src/utils/validacao.ts
// Validações de entrada reutilizadas pelos controllers. Todas lançam HttpError(400).
import type { Request } from "express";
import { HttpError } from "./HttpError.js";

export const ROLES = ["admin", "cliente"] as const;
export type Role = (typeof ROLES)[number];

export const STATUS_PEDIDO = ["PENDENTE", "PAGO", "PROCESSANDO", "ENVIADO", "CONCLUIDO", "CANCELADO"] as const;
export type StatusPedido = (typeof STATUS_PEDIDO)[number];

/** Garante que o body seja um objeto (Express 5 deixa req.body undefined quando não há corpo). */
export function corpo(req: Request): Record<string, unknown> {
    const b: unknown = req.body;
    if (b === null || typeof b !== "object" || Array.isArray(b)) return {};
    return b as Record<string, unknown>;
}

export function idDaRota(req: Request, nome: string): number {
    const id = Number(req.params[nome]);
    if (!Number.isInteger(id) || id <= 0) throw new HttpError(400, `Parâmetro "${nome}" inválido.`);
    return id;
}

export function texto(valor: unknown, campo: string, max = 255): string {
    if (typeof valor !== "string" || !valor.trim()) throw new HttpError(400, `O campo ${campo} é obrigatório.`);
    const limpo = valor.trim();
    if (limpo.length > max) throw new HttpError(400, `O campo ${campo} deve ter no máximo ${max} caracteres.`);
    return limpo;
}

export function textoOpcional(valor: unknown, campo: string, max = 255): string | null {
    if (valor === undefined || valor === null || valor === "") return null;
    return texto(valor, campo, max);
}

export function email(valor: unknown): string {
    const e = texto(valor, "email", 150).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new HttpError(400, "E-mail inválido.");
    return e;
}

/** Aceita "00000000000" ou "000.000.000-00" e sempre devolve no formato com máscara. */
export function cpf(valor: unknown): string {
    const digitos = texto(valor, "cpf", 20).replace(/\D/g, "");
    if (digitos.length !== 11) throw new HttpError(400, "CPF inválido: informe os 11 dígitos.");
    return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9)}`;
}

/** bcrypt só considera os 72 primeiros bytes; por isso o limite máximo. */
export function senha(valor: unknown): string {
    if (typeof valor !== "string" || !valor) throw new HttpError(400, "O campo senha é obrigatório.");
    if (valor.length < 8) throw new HttpError(400, "A senha deve ter pelo menos 8 caracteres.");
    if (Buffer.byteLength(valor, "utf8") > 72) throw new HttpError(400, "A senha deve ter no máximo 72 bytes.");
    return valor;
}

export function role(valor: unknown): Role {
    if (typeof valor !== "string" || !(ROLES as readonly string[]).includes(valor)) {
        throw new HttpError(400, `Role inválida. Valores aceitos: ${ROLES.join(", ")}.`);
    }
    return valor as Role;
}

export function statusPedido(valor: unknown): StatusPedido {
    const s = typeof valor === "string" ? valor.trim().toUpperCase() : "";
    if (!(STATUS_PEDIDO as readonly string[]).includes(s)) {
        throw new HttpError(400, `Status inválido. Valores aceitos: ${STATUS_PEDIDO.join(", ")}.`);
    }
    return s as StatusPedido;
}

export function numero(valor: unknown, campo: string, max = 99_999_999.99): number {
    const n = typeof valor === "string" && valor.trim() !== "" ? Number(valor) : valor;
    if (typeof n !== "number" || !Number.isFinite(n) || n < 0 || n > max) {
        throw new HttpError(400, `O campo ${campo} deve ser um número válido maior ou igual a zero.`);
    }
    return Math.round(n * 100) / 100;
}

export function inteiro(valor: unknown, campo: string, min = 0, max = 1_000_000): number {
    const n = typeof valor === "string" && valor.trim() !== "" ? Number(valor) : valor;
    if (typeof n !== "number" || !Number.isInteger(n) || n < min || n > max) {
        throw new HttpError(400, `O campo ${campo} deve ser um número inteiro entre ${min} e ${max}.`);
    }
    return n;
}
