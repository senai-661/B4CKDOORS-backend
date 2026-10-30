import type { ItemPedidoDTO } from "./ItemPedidoDTO.js";

export interface PedidoDTO {
    idPedido?: number;
    codPedido?: string;
    idUsuario: number;
    dataPedido?: string;
    valorTotal: number;
    status?: string;
    itens?: ItemPedidoDTO[];
}
