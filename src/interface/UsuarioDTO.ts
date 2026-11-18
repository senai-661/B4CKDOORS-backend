export interface UsuarioDTO {
    idUsuario?: number;
    nome:       string;
    email:      string;
    cpf:        string;
    senha:      string;
    role?:      "cliente" | "admin";
    // Usado pela tela de perfil (PPerfil) do frontend.
    telefone?:  string | null;
}
