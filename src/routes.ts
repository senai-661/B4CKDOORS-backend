import type { Request, Response } from "express";
import { Router } from "express";

import UsuarioController from "./controller/UsuarioController.js";
import CategoriaController from "./controller/CategoriaController.js";
import ProdutoController from "./controller/ProdutoController.js";
import PedidoController from "./controller/PedidoController.js";
import CupomController from "./controller/CupomController.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Se você está vendo essa mensagem, seu servidor está funcionando." });
});

/**
 * Endpoints para Usuários
 */
router.get("/api/usuarios", UsuarioController.todos);
router.get("/api/usuarios/:idUsuario", UsuarioController.usuario);
router.post("/api/usuarios", UsuarioController.novo);
router.put("/api/usuarios/:idUsuario", UsuarioController.atualizar);
router.delete("/api/usuarios/:idUsuario", UsuarioController.remover);

/**
 * Endpoints para Categorias
 */
router.get("/api/categorias", CategoriaController.todos);
router.get("/api/categorias/:idCategoria", CategoriaController.categoria);
router.post("/api/categorias", CategoriaController.novo);
router.put("/api/categorias/:idCategoria", CategoriaController.atualizar);
router.delete("/api/categorias/:idCategoria", CategoriaController.remover);

/**
 * Endpoints para Produtos
 */
router.get("/api/produtos", ProdutoController.todos);
router.get("/api/produtos/:idProduto", ProdutoController.produto);
router.post("/api/produtos", ProdutoController.novo);
router.put("/api/produtos/:idProduto", ProdutoController.atualizar);
router.delete("/api/produtos/:idProduto", ProdutoController.remover);

/**
 * Endpoints para Pedidos
 */
router.get("/api/pedidos", PedidoController.todos);
router.get("/api/pedidos/:idPedido", PedidoController.pedido);
router.post("/api/pedidos", PedidoController.novo);
router.put("/api/pedidos/:idPedido", PedidoController.atualizar);
router.delete("/api/pedidos/:idPedido", PedidoController.remover);

export { router };