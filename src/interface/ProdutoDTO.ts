export interface CaracteristicaProdutoDTO {
  nome: string;
  valor: string;
}

export interface ProdutoDTO {
  // =========================
  // DADOS PRINCIPAIS
  // =========================

  idProduto?: number;
  codProduto?: string;

  nome: string;

  descricao?: string | null;

  preco: number;

  estoque: number;

  imagem?: string | null;

  idCategoria: number;

  // =========================
  // INFORMAÇÕES DO PRODUTO
  // =========================

  marca?: string;

  genero?: string;

  esporte?: string;

  modalidade?: string;

  faixaEtaria?: string;

  linha?: string;

  // =========================
  // VARIAÇÕES
  // =========================

  cores?: string[];

  tamanhos?: string[];

  // =========================
  // PREÇO / PROMOÇÃO
  // =========================

  desconto?: number;

  precoAnterior?: number;

  parcelas?: number;

  promocao?: boolean;

  destaque?: boolean;

  // =========================
  // AVALIAÇÕES
  // =========================

  avaliacao?: number;

  quantidadeAvaliacoes?: number;

  // =========================
  // CARACTERÍSTICAS
  // =========================

  caracteristicas?: CaracteristicaProdutoDTO[];
}