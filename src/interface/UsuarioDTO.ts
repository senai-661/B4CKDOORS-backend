import type { Role } from "../utils/validacao.js";

/** Usuário como exposto pela API (NUNCA inclui senha/hash). */
export interface UsuarioDTO {
    idUsuario?: number;
    nome: string;
    email: string;
    cpf: string;
    role: Role;
}

/** Dados necessários para cadastrar (a senha já chega como hash bcrypt). */
export interface UsuarioCadastroDTO {
    nome: string;
    email: string;
    cpf: string;
    senhaHash: string;
    role: Role;
}

/** Registro usado só no login: inclui o hash para comparação. */
export interface UsuarioCredenciaisDTO extends UsuarioDTO {
    idUsuario: number;
    senhaHash: string;
}
