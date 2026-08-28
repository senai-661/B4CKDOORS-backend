export interface PedidoDTO {
    idPedido?:  number;
    codPedido?: string;
    idUsuario:  number;
    total:      number;
    status?:    string;
    createdAt?: Date;
}
