export interface ProdutoDTO {
    idProduto?: number;
    codProduto?: string;
    nome: string;
    descricao?: string | null;
    preco: number;
    estoque: number;
    imagem?: string | null;
    idCategoria: number;
}
