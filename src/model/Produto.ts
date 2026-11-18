// src/model/Produto.ts
import type { Pool, PoolClient } from "pg";
import { DatabaseModel } from "./DatabaseModel.js";
import type { ProdutoDTO } from "../interface/ProdutoDTO.js";

const database = new DatabaseModel().pool;

// SELECT único (lista + busca por id): já traz o NOME da marca pelo JOIN com a tabela "marca"
const SELECT_PRODUTO = `
    SELECT p.id_produto, p.cod_produto, p.nome, p.descricao, p.preco, p.estoque, p.id_categoria, p.imagem,
           p.id_marca, m.nome AS marca,
           p.genero, p.esporte, p.faixa_etaria, p.cores, p.tamanhos,
           p.promocao, p.desconto, p.preco_anterior, p.parcelas, p.linha, p.caracteristicas
      FROM produtos p
      LEFT JOIN marca m ON m.id_marca = p.id_marca
`;

function paraDTO(row: any): ProdutoDTO {
    const preco = Number(row.preco);
    const precoAnterior = row.preco_anterior !== null && row.preco_anterior !== undefined ? Number(row.preco_anterior) : null;
    let desconto = Number(row.desconto) || 0;
    // se o desconto não foi gravado mas existe preço anterior maior, calcula
    if (!desconto && precoAnterior && precoAnterior > preco) desconto = Math.round((1 - preco / precoAnterior) * 100);

    return {
        idProduto:       row.id_produto,
        codProduto:      row.cod_produto,
        nome:            row.nome,
        descricao:       row.descricao,
        preco,
        estoque:         row.estoque,
        idCategoria:     row.id_categoria,
        imagem:          row.imagem,
        idMarca:         row.id_marca ?? null,
        // o frontend filtra por texto; quando não há marca deixamos undefined (some do JSON)
        ...(row.marca ? { marca: row.marca as string } : {}),
        ...(row.genero ? { genero: row.genero as string } : {}),
        ...(row.esporte ? { esporte: row.esporte as string } : {}),
        ...(row.faixa_etaria ? { faixaEtaria: row.faixa_etaria as string } : {}),
        cores:           row.cores ?? [],
        tamanhos:        row.tamanhos ?? [],
        promocao:        Boolean(row.promocao) || desconto > 0,
        desconto,
        ...(precoAnterior !== null ? { precoAnterior } : {}),
        ...(row.parcelas ? { parcelas: Number(row.parcelas) } : {}),
        ...(row.linha ? { linha: row.linha as string } : {}),
        caracteristicas: row.caracteristicas ?? [],
    };
}

// ── helpers de saneamento ────────────────────────────────────────────
const textoOuNull = (v: unknown): string | null => {
    if (v === null || v === undefined) return null;
    const t = String(v).trim();
    return t === "" ? null : t;
};

const lista = (v: unknown): string[] => {
    const itens = Array.isArray(v) ? v : typeof v === "string" ? v.split(",") : [];
    return [...new Set(itens.map((i) => String(i).trim()).filter(Boolean))];
};

const numeroOuNull = (v: unknown): number | null => {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
};

/**
 * Descobre o id_marca a partir do que o frontend mandou.
 *  - retorna undefined → o corpo não falou de marca: NÃO mexe no que está salvo
 *  - retorna null      → tirar a marca do produto
 *  - retorna number    → marca escolhida (criada na hora, se ainda não existir)
 */
async function resolverMarca(db: Pool | PoolClient, dados: ProdutoDTO): Promise<number | null | undefined> {
    if (dados.idMarca !== undefined) {
        return dados.idMarca === null ? null : Number(dados.idMarca);
    }
    if (dados.marca === undefined) return undefined;

    const nome = textoOuNull(dados.marca);
    if (!nome) return null;

    const achada = await db.query(`SELECT id_marca FROM marca WHERE lower(nome) = lower($1) LIMIT 1`, [nome]);
    if (achada.rows.length > 0) return achada.rows[0].id_marca;

    const criada = await db.query(
        `INSERT INTO marca (nome) VALUES ($1)
         ON CONFLICT (nome) DO UPDATE SET nome = EXCLUDED.nome
         RETURNING id_marca`, [nome]
    );
    return criada.rows[0].id_marca;
}

/**
 * Monta { coluna: valor } só com o que o corpo realmente trouxe.
 * Assim o PUT do painel (que só manda nome/preço/estoque/marca...) não apaga gênero, tamanhos etc.
 */
function colunasDoCorpo(d: ProdutoDTO): Record<string, unknown> {
    const c: Record<string, unknown> = {};
    if (d.descricao       !== undefined) c.descricao       = d.descricao ?? null;
    if (d.imagem          !== undefined) c.imagem          = d.imagem ?? null;
    if (d.genero          !== undefined) c.genero          = textoOuNull(d.genero);
    if (d.esporte         !== undefined) c.esporte         = textoOuNull(d.esporte);
    if (d.faixaEtaria     !== undefined) c.faixa_etaria    = textoOuNull(d.faixaEtaria);
    if (d.cores           !== undefined) c.cores           = lista(d.cores);
    if (d.tamanhos        !== undefined) c.tamanhos        = lista(d.tamanhos);
    if (d.promocao        !== undefined) c.promocao        = Boolean(d.promocao);
    if (d.desconto        !== undefined) c.desconto        = Math.max(0, Math.round(Number(d.desconto) || 0));
    if (d.precoAnterior   !== undefined) c.preco_anterior  = numeroOuNull(d.precoAnterior);
    if (d.parcelas        !== undefined) c.parcelas        = numeroOuNull(d.parcelas);
    if (d.linha           !== undefined) c.linha           = textoOuNull(d.linha);
    if (d.caracteristicas !== undefined) c.caracteristicas = JSON.stringify(Array.isArray(d.caracteristicas) ? d.caracteristicas : []);
    return c;
}

export class Produto {

    static async listarProdutos(): Promise<ProdutoDTO[] | null> {
        try {
            const resposta = await database.query(`${SELECT_PRODUTO} ORDER BY p.nome ASC`);
            return resposta.rows.map(paraDTO);
        } catch (error) {
            console.error("[Produto] Erro ao listar:", error);
            return null;
        }
    }

    static async buscarProduto(id: number): Promise<ProdutoDTO | null> {
        try {
            const resposta = await database.query(`${SELECT_PRODUTO} WHERE p.id_produto = $1`, [id]);
            if (resposta.rows.length === 0) return null;
            return paraDTO(resposta.rows[0]);
        } catch (error) {
            console.error("[Produto] Erro ao buscar:", error);
            return null;
        }
    }

    static async cadastrarProduto(produto: ProdutoDTO): Promise<boolean> {
        try {
            const idMarca = await resolverMarca(database, produto);
            const extras  = colunasDoCorpo(produto);
            if (idMarca !== undefined) extras.id_marca = idMarca;

            const colunas = ["nome", "preco", "estoque", "id_categoria", ...Object.keys(extras)];
            const valores = [produto.nome, produto.preco, produto.estoque, produto.idCategoria, ...Object.values(extras)];
            const marcadores = colunas.map((_, i) => (colunas[i] === "caracteristicas" ? `$${i + 1}::jsonb` : `$${i + 1}`));

            const resposta = await database.query(
                `INSERT INTO produtos (${colunas.join(", ")}) VALUES (${marcadores.join(", ")}) RETURNING id_produto`,
                valores
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Produto] Erro ao cadastrar:", error);
            return false;
        }
    }

    static async atualizarProduto(id: number, produto: ProdutoDTO): Promise<boolean> {
        try {
            const idMarca = await resolverMarca(database, produto);
            const campos: Record<string, unknown> = {
                nome: produto.nome, preco: produto.preco, estoque: produto.estoque, id_categoria: produto.idCategoria,
                ...colunasDoCorpo(produto),
            };
            if (idMarca !== undefined) campos.id_marca = idMarca;

            const nomes   = Object.keys(campos);
            const sets    = nomes.map((n, i) => `${n} = $${i + 1}${n === "caracteristicas" ? "::jsonb" : ""}`);
            const valores = [...Object.values(campos), id];

            const resposta = await database.query(
                `UPDATE produtos SET ${sets.join(", ")} WHERE id_produto = $${valores.length} RETURNING id_produto`,
                valores
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Produto] Erro ao atualizar:", error);
            return false;
        }
    }

    static async removerProduto(id: number): Promise<boolean> {
        try {
            const resposta = await database.query(
                `DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto`, [id]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Produto] Erro ao remover:", error);
            return false;
        }
    }
}

export default Produto;
