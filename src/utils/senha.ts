// src/utils/senha.ts
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";

/** Gera o hash bcrypt (com salt aleatório embutido) da senha. */
export function gerarHash(senha: string): Promise<string> {
    return bcrypt.hash(senha, env.bcryptRounds);
}

export function compararSenha(senha: string, hash: string): Promise<boolean> {
    return bcrypt.compare(senha, hash);
}

/**
 * Hash descartável usado no login quando o e-mail não existe, para que a
 * resposta demore o mesmo tempo (evita enumerar e-mails medindo a latência).
 */
export const HASH_FICTICIO = bcrypt.hashSync("senha-ficticia-para-timing", env.bcryptRounds);
