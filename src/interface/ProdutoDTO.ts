export interface ProdutoDTO {
    idProduto?: number;
    codProduto?: string;
    nome: string;
    descricao?: string;
    preco: number;
    estoque: number;
    idCategoria: number;
    imagem ?: string;
    id_categoria?: number;
    created_at?: Date;
}