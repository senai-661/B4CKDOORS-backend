// src/routes.ts
import type { Request, Response } from "express";
import { Router } from "express";
import rateLimit from "express-rate-limit";

import AuthController from "./controller/AuthController.js";
import UsuarioController from "./controller/UsuarioController.js";
import CategoriaController from "./controller/CategoriaController.js";
import ProdutoController from "./controller/ProdutoController.js";
import PedidoController from "./controller/PedidoController.js";
import { autenticar, autenticarOpcional, somenteAdmin } from "./middlewares/Auth.js";

const router = Router();

// Limites contra força bruta / abuso nas rotas de credenciais
const limiteLogin = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    skipSuccessfulRequests: true,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { mensagem: "Muitas tentativas de login. Tente novamente em alguns minutos." },
});
const limiteCadastro = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { mensagem: "Muitos cadastros a partir deste endereço. Tente novamente mais tarde." },
});

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        mensagem: "Se você está vendo essa mensagem, seu servidor está funcionando.",
        timestamp: new Date().toISOString(),
    });
});

/** Autenticação */
router.post("/api/login", limiteLogin, AuthController.login);
router.post("/login", limiteLogin, AuthController.login); // alias sem prefixo
router.get("/api/me", autenticar, AuthController.me);

/** Usuários */
router.get("/api/usuarios", autenticar, somenteAdmin, UsuarioController.todos);
router.get("/api/usuarios/:idUsuario", autenticar, UsuarioController.usuario); // admin ou próprio
router.post("/api/usuarios", limiteCadastro, autenticarOpcional, UsuarioController.novo); // cadastro público
router.put("/api/usuarios/:idUsuario", autenticar, UsuarioController.atualizar); // admin ou próprio
router.delete("/api/usuarios/:idUsuario", autenticar, somenteAdmin, UsuarioController.remover);

/** Categorias: leitura pública, escrita só admin */
router.get("/api/categorias", CategoriaController.todos);
router.get("/api/categorias/:idCategoria", CategoriaController.categoria);
router.post("/api/categorias", autenticar, somenteAdmin, CategoriaController.novo);
router.put("/api/categorias/:idCategoria", autenticar, somenteAdmin, CategoriaController.atualizar);
router.delete("/api/categorias/:idCategoria", autenticar, somenteAdmin, CategoriaController.remover);

/** Produtos: leitura pública (vitrine), escrita só admin */
router.get("/api/produtos", ProdutoController.todos);
router.get("/api/produtos/:idProduto", ProdutoController.produto);
router.post("/api/produtos", autenticar, somenteAdmin, ProdutoController.novo);
router.put("/api/produtos/:idProduto", autenticar, somenteAdmin, ProdutoController.atualizar);
router.delete("/api/produtos/:idProduto", autenticar, somenteAdmin, ProdutoController.remover);

/** Pedidos: exigem login; o controller restringe cliente aos próprios pedidos */
router.get("/api/pedidos", autenticar, PedidoController.todos);
router.get("/api/pedidos/:idPedido", autenticar, PedidoController.pedido);
router.post("/api/pedidos", autenticar, PedidoController.novo);
router.put("/api/pedidos/:idPedido", autenticar, somenteAdmin, PedidoController.atualizar);
router.delete("/api/pedidos/:idPedido", autenticar, somenteAdmin, PedidoController.remover);

export { router };
