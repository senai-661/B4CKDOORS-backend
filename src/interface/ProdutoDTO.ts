export interface ProdutoDTO {
    idProduto?:  number;
    codProduto?: string;
    nome:        string;
    descricao?:  string;
    preco:       number;
    estoque:     number;
    idCategoria: number;
}