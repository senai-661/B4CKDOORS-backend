export interface UsuarioDTO {
    idUsuario?: number;
    nome: string;
    email: string;
    cpf: string;        // ← adiciona essa linha
    senha: string;
    created_at?: Date;
}