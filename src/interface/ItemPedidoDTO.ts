export interface ItemPedidoDTO {
    idItem?: number;
    idPedido?: number;
    idProduto: number;
    nomeProduto?: string;
    quantidade: number;
    precoUnit?: number;
}
