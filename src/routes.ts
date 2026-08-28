import { Router, type Request, type Response } from "express";

import UsuarioController   from "./controller/UsuarioController.js";
import CategoriaController from "./controller/CategoriaController.js";
import ProdutoController   from "./controller/ProdutoController.js";
import PedidoController    from "./controller/PedidoController.js";
import { Auth }            from "./middleware/Auth.js";

const router = Router();

// Health Check
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "GRENÁ / B4CKDOORS API Online", timestamp: new Date() });
});

// Login — rota pública. Devolve o token junto do usuário (com sua role: "cliente" ou "admin")
router.post("/api/login", Auth.validacaoUsuario);

// Usuários
// Cadastro de cliente é público (sempre criado com role "cliente")
router.post  ("/api/usuarios",                              UsuarioController.novo);
// Listar/consultar/editar/remover usuários é restrito — qualquer usuário logado pode ver/editar o próprio perfil,
// mas a listagem completa e a remoção ficam restritas ao admin.
router.get   ("/api/usuarios",            Auth.verifyToken, Auth.verifyAdmin, UsuarioController.todos);
router.get   ("/api/usuarios/:idUsuario", Auth.verifyToken,                  UsuarioController.usuario);
router.put   ("/api/usuarios/:idUsuario", Auth.verifyToken,                  UsuarioController.atualizar);
router.delete("/api/usuarios/:idUsuario", Auth.verifyToken, Auth.verifyAdmin, UsuarioController.remover);

// Categorias
// Consulta é pública (a loja precisa listar categorias sem exigir login)
router.get   ("/api/categorias",              CategoriaController.todos);
router.get   ("/api/categorias/:idCategoria", CategoriaController.categoria);
// Escrita é restrita ao admin (painel administrativo)
router.post  ("/api/categorias",              Auth.verifyToken, Auth.verifyAdmin, CategoriaController.novo);
router.put   ("/api/categorias/:idCategoria", Auth.verifyToken, Auth.verifyAdmin, CategoriaController.atualizar);
router.delete("/api/categorias/:idCategoria", Auth.verifyToken, Auth.verifyAdmin, CategoriaController.remover);

// Produtos
// Consulta é pública (vitrine da loja)
router.get   ("/api/produtos",            ProdutoController.todos);
router.get   ("/api/produtos/:idProduto", ProdutoController.produto);
// Escrita é restrita ao admin (painel administrativo)
router.post  ("/api/produtos",            Auth.verifyToken, Auth.verifyAdmin, ProdutoController.novo);
router.put   ("/api/produtos/:idProduto", Auth.verifyToken, Auth.verifyAdmin, ProdutoController.atualizar);
router.delete("/api/produtos/:idProduto", Auth.verifyToken, Auth.verifyAdmin, ProdutoController.remover);

// Pedidos
// Qualquer usuário autenticado pode criar/ver pedidos (o cliente faz seu próprio checkout);
// a listagem completa fica disponível para o admin no painel.
router.get   ("/api/pedidos",           Auth.verifyToken,                  PedidoController.todos);
router.get   ("/api/pedidos/:idPedido", Auth.verifyToken,                  PedidoController.pedido);
router.post  ("/api/pedidos",           Auth.verifyToken,                  PedidoController.novo);
router.put   ("/api/pedidos/:idPedido", Auth.verifyToken, Auth.verifyAdmin, PedidoController.atualizar);
router.delete("/api/pedidos/:idPedido", Auth.verifyToken, Auth.verifyAdmin, PedidoController.remover);

export { router };
