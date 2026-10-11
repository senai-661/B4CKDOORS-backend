export interface PedidoDTO {
    idPedido?:  number;
    codPedido?: string;
    idUsuario:  number;
    valorTotal: number;
    status?:    string;
    createdAt?: Date;
}