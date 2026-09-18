import { Router, type Request, type Response } from "express";

import UsuarioController from "./controller/UsuarioController.js";
import CategoriaController from "./controller/CategoriaController.js";
import ProdutoController from "./controller/ProdutoController.js";
import PedidoController from "./controller/PedidoController.js";

import { Auth } from "./middleware/Auth.js";

const router = Router();

/* ============================================================
   HEALTH CHECK
   ============================================================ */

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "GRENÁ / B4CKDOORS API Online",
    timestamp: new Date(),
  });
});

/* ============================================================
   BUSCA AUTOMÁTICA DE IMAGEM DO PRODUTO
   ============================================================ */

router.get("/api/imagem-produto", async (req: Request, res: Response) => {
  try {
    const nome = String(req.query.nome || "").trim();

    if (!nome) {
      return res.status(400).json({
        erro: "O nome do produto é obrigatório.",
      });
    }

    const apiKey = process.env.SERPAPI_KEY;

    if (!apiKey) {
      console.error("SERPAPI_KEY não encontrada no .env.");

      return res.status(500).json({
        erro: "SERPAPI_KEY não configurada no backend.",
      });
    }

    const termoBusca = `${nome} produto`;

    const params = new URLSearchParams({
      engine: "google_images",
      q: termoBusca,
      api_key: apiKey,
      hl: "pt-br",
      gl: "br",
      safe: "active",
    });

    const url = `https://serpapi.com/search.json?${params.toString()}`;

    console.log(`Buscando imagem para: ${nome}`);

    const resposta = await fetch(url);

    if (!resposta.ok) {
      const erroTexto = await resposta.text();

      console.error(
        "Erro ao consultar SerpAPI:",
        resposta.status,
        erroTexto
      );

      return res.status(resposta.status).json({
        erro: "Erro ao consultar a SerpAPI.",
      });
    }

    const dados: any = await resposta.json();

    const resultados = dados.images_results || [];

    console.log(
      `Resultados encontrados para "${nome}":`,
      resultados.length
    );

    if (!resultados.length) {
      return res.status(404).json({
        erro: "Nenhuma imagem encontrada.",
      });
    }

    const resultadoProduto = resultados.find(
      (item: any) =>
        item.is_product &&
        (item.original || item.thumbnail)
    );

    const resultadoNormal = resultados.find(
      (item: any) =>
        item.original || item.thumbnail
    );

    const resultado =
      resultadoProduto ||
      resultadoNormal;

    if (!resultado) {
      return res.status(404).json({
        erro: "Nenhuma imagem válida encontrada.",
      });
    }

    const imagem =
      resultado.original ||
      resultado.thumbnail ||
      "";

    return res.status(200).json({
      nome,
      imagem,
      titulo: resultado.title || "",
      fonte: resultado.source || "",
    });
  } catch (error) {
    console.error(
      "Erro interno ao buscar imagem:",
      error
    );

    return res.status(500).json({
      erro: "Erro interno ao buscar imagem do produto.",
    });
  }
});

/* ============================================================
   LOGIN
   ============================================================ */

router.post(
  "/api/login",
  Auth.validacaoUsuario
);

/* ============================================================
   USUÁRIOS
   ============================================================ */

router.post(
  "/api/usuarios",
  UsuarioController.novo
);

router.get(
  "/api/usuarios",
  Auth.verifyToken,
  Auth.verifyAdmin,
  UsuarioController.todos
);

router.get(
  "/api/usuarios/:idUsuario",
  Auth.verifyToken,
  UsuarioController.usuario
);

router.put(
  "/api/usuarios/:idUsuario",
  Auth.verifyToken,
  UsuarioController.atualizar
);

router.delete(
  "/api/usuarios/:idUsuario",
  Auth.verifyToken,
  Auth.verifyAdmin,
  UsuarioController.remover
);

/* ============================================================
   CATEGORIAS
   ============================================================ */

router.get(
  "/api/categorias",
  CategoriaController.todos
);

router.get(
  "/api/categorias/:idCategoria",
  CategoriaController.categoria
);

router.post(
  "/api/categorias",
  Auth.verifyToken,
  Auth.verifyAdmin,
  CategoriaController.novo
);

router.put(
  "/api/categorias/:idCategoria",
  Auth.verifyToken,
  Auth.verifyAdmin,
  CategoriaController.atualizar
);

router.delete(
  "/api/categorias/:idCategoria",
  Auth.verifyToken,
  Auth.verifyAdmin,
  CategoriaController.remover
);

/* ============================================================
   PRODUTOS
   ============================================================ */

router.get(
  "/api/produtos",
  ProdutoController.todos
);

router.get(
  "/api/produtos/:idProduto",
  ProdutoController.produto
);

router.post(
  "/api/produtos",
  Auth.verifyToken,
  Auth.verifyAdmin,
  ProdutoController.novo
);

router.put(
  "/api/produtos/:idProduto",
  Auth.verifyToken,
  Auth.verifyAdmin,
  ProdutoController.atualizar
);

router.delete(
  "/api/produtos/:idProduto",
  Auth.verifyToken,
  Auth.verifyAdmin,
  ProdutoController.remover
);

/* ============================================================
   PEDIDOS
   ============================================================ */

router.get(
  "/api/pedidos",
  Auth.verifyToken,
  PedidoController.todos
);

router.get(
  "/api/pedidos/:idPedido",
  Auth.verifyToken,
  PedidoController.pedido
);

router.post(
  "/api/pedidos",
  Auth.verifyToken,
  PedidoController.novo
);

router.put(
  "/api/pedidos/:idPedido",
  Auth.verifyToken,
  Auth.verifyAdmin,
  PedidoController.atualizar
);

router.delete(
  "/api/pedidos/:idPedido",
  Auth.verifyToken,
  Auth.verifyAdmin,
  PedidoController.remover
);

export { router };