import type { Request, Response } from "express";
import { Router } from "express";

import { Auth } from "./middleware/Auth.js";

import UsuarioController   from "./controller/UsuarioController.js";
import CategoriaController from "./controller/CategoriaController.js";
import ProdutoController   from "./controller/ProdutoController.js";
import PedidoController    from "./controller/PedidoController.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Se você está vendo essa mensagem, seu servidor está funcionando." });
});

/**
 * Rota pública — Login
 */
router.post("/api/login", Auth.validacaoUsuario);

/**
 * Endpoints para Usuários
 */
router.get   ("/api/usuarios",               Auth.verifyToken, UsuarioController.todos);
router.get   ("/api/usuarios/:idUsuario",    Auth.verifyToken, UsuarioController.usuario);
router.post  ("/api/usuarios",               UsuarioController.novo);       // cadastro é público
router.put   ("/api/usuarios/:idUsuario",    Auth.verifyToken, UsuarioController.atualizar);
router.delete("/api/usuarios/:idUsuario",    Auth.verifyToken, UsuarioController.remover);

/**
 * Endpoints para Categorias
 */
router.get   ("/api/categorias",              Auth.verifyToken, CategoriaController.todos);
router.get   ("/api/categorias/:idCategoria", Auth.verifyToken, CategoriaController.categoria);
router.post  ("/api/categorias",              Auth.verifyToken, CategoriaController.novo);
router.put   ("/api/categorias/:idCategoria", Auth.verifyToken, CategoriaController.atualizar);
router.delete("/api/categorias/:idCategoria", Auth.verifyToken, CategoriaController.remover);

/**
 * Endpoints para Produtos
 */
router.get   ("/api/produtos",              Auth.verifyToken, ProdutoController.todos);
router.get   ("/api/produtos/:idProduto",   Auth.verifyToken, ProdutoController.produto);
router.post  ("/api/produtos",              Auth.verifyToken, ProdutoController.novo);
router.put   ("/api/produtos/:idProduto",   Auth.verifyToken, ProdutoController.atualizar);
router.delete("/api/produtos/:idProduto",   Auth.verifyToken, ProdutoController.remover);

/**
 * Endpoints para Pedidos
 */
router.get   ("/api/pedidos",            Auth.verifyToken, PedidoController.todos);
router.get   ("/api/pedidos/:idPedido",  Auth.verifyToken, PedidoController.pedido);
router.post  ("/api/pedidos",            Auth.verifyToken, PedidoController.novo);
router.put   ("/api/pedidos/:idPedido",  Auth.verifyToken, PedidoController.atualizar);
router.delete("/api/pedidos/:idPedido",  Auth.verifyToken, PedidoController.remover);

export { router };