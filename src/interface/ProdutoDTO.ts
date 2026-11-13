export interface CaracteristicaDTO {
    nome:  string;
    valor: string;
}

export interface ProdutoDTO {
    idProduto?:   number;
    codProduto?:  string;
    nome:         string;
    descricao?:   string;
    preco:        number;
    estoque:      number;
    idCategoria:  number;
    // URL da imagem do produto (consumida pelo frontend em ImagemProduto/PProduto/PLoja).
    imagem?:      string | null;

    // ── Marca (ligada à tabela "marca") ──────────────────────────────
    // Na leitura vêm os dois. Na escrita basta mandar UM:
    //   idMarca → usa a marca já cadastrada
    //   marca   → procura pelo nome (e cria se ainda não existir)
    //   null    → remove a marca do produto
    idMarca?:     number | null;
    marca?:       string | null;

    // ── Campos usados pelos filtros da loja ─────────────────────────
    genero?:        string | null;
    esporte?:       string | null;
    faixaEtaria?:   string | null;
    cores?:         string[];
    tamanhos?:      string[];
    promocao?:      boolean;
    desconto?:      number;
    precoAnterior?: number | null;
    parcelas?:      number | null;
    linha?:         string | null;
    caracteristicas?: CaracteristicaDTO[];
}
