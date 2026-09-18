import { DatabaseModel } from "./DatabaseModel.js";
import type { ProdutoDTO } from "../interface/ProdutoDTO.js";

const database = new DatabaseModel().pool;

// ============================================================
// MAPEAR RESULTADO DO POSTGRESQL PARA ProdutoDTO
// ============================================================

const mapRow = (row: any): ProdutoDTO => {
  return {
    idProduto: Number(row.id_produto),

    codProduto: row.cod_produto ?? "",

    nome: row.nome ?? "",

    descricao: row.descricao ?? "",

    preco: Number(row.preco ?? 0),

    estoque: Number(row.estoque ?? 0),

    imagem: row.imagem ?? null,

    idCategoria: Number(row.id_categoria ?? 0),

    // ========================================================
    // DETALHES
    // ========================================================

    marca: row.marca ?? "GRENÁ",

    genero: row.genero ?? "Unissex",

    esporte: row.esporte ?? "Casual",

    modalidade: row.modalidade ?? "Casual",

    faixaEtaria: row.faixa_etaria ?? "Adulto",

    linha: row.linha ?? "Essentials",

    // ========================================================
    // VARIAÇÕES
    // ========================================================

    cores: Array.isArray(row.cores)
      ? row.cores.filter(Boolean)
      : [],

    tamanhos: Array.isArray(row.tamanhos)
      ? row.tamanhos.filter(Boolean)
      : [],

    // ========================================================
    // PREÇO / PROMOÇÃO
    // ========================================================

    desconto: Number(row.desconto ?? 0),

    // SEM undefined:
    // se não houver preço anterior, utiliza o preço atual.
    precoAnterior: Number(
      row.preco_anterior ?? row.preco ?? 0
    ),

    parcelas: Number(row.parcelas ?? 1),

    promocao: Boolean(row.promocao),

    destaque: Boolean(row.destaque),

    // ========================================================
    // AVALIAÇÕES
    // ========================================================

    avaliacao: Number(row.avaliacao ?? 0),

    quantidadeAvaliacoes: Number(
      row.quantidade_avaliacoes ?? 0
    ),

    // ========================================================
    // CARACTERÍSTICAS
    // ========================================================

    caracteristicas: Array.isArray(row.caracteristicas)
      ? row.caracteristicas
      : [],
  };
};


// ============================================================
// SELECT COMPLETO DOS PRODUTOS
// ============================================================

const SELECT_PRODUTO_COMPLETO = `
  SELECT
    p.id_produto,
    p.cod_produto,
    p.nome,
    p.descricao,
    p.preco,
    p.estoque,
    p.imagem,
    p.id_categoria,

    d.marca,
    d.genero,
    d.esporte,
    d.modalidade,
    d.faixa_etaria,
    d.linha,

    d.preco_anterior,
    d.desconto,
    d.parcelas,

    d.avaliacao,
    d.quantidade_avaliacoes,

    d.promocao,
    d.destaque,

    COALESCE(
      (
        SELECT ARRAY_AGG(
          DISTINCT v.cor
          ORDER BY v.cor
        )
        FROM variacoes_produto v
        WHERE
          v.id_produto = p.id_produto
          AND v.cor IS NOT NULL
      ),
      ARRAY[]::VARCHAR[]
    ) AS cores,

    COALESCE(
      (
        SELECT ARRAY_AGG(
          DISTINCT v.tamanho
          ORDER BY v.tamanho
        )
        FROM variacoes_produto v
        WHERE
          v.id_produto = p.id_produto
          AND v.tamanho IS NOT NULL
      ),
      ARRAY[]::VARCHAR[]
    ) AS tamanhos,

    COALESCE(
      (
        SELECT JSON_AGG(
          JSON_BUILD_OBJECT(
            'nome', c.nome,
            'valor', c.valor
          )
          ORDER BY c.id_caracteristica
        )
        FROM caracteristicas_produto c
        WHERE c.id_produto = p.id_produto
      ),
      '[]'::JSON
    ) AS caracteristicas

  FROM produtos p

  LEFT JOIN detalhes_produto d
    ON d.id_produto = p.id_produto
`;


// ============================================================
// MODEL PRODUTO
// ============================================================

export class Produto {

  // ==========================================================
  // LISTAR TODOS OS PRODUTOS
  // ==========================================================

  static async listarProdutos(): Promise<ProdutoDTO[] | null> {
    try {
      const resultado = await database.query(`
        ${SELECT_PRODUTO_COMPLETO}

        ORDER BY p.nome ASC
      `);

      return resultado.rows.map(mapRow);

    } catch (error) {
      console.error(
        "[Produto] Erro ao listar produtos:",
        error
      );

      return null;
    }
  }


  // ==========================================================
  // BUSCAR PRODUTO POR ID
  // ==========================================================

  static async buscarProduto(
    id: number
  ): Promise<ProdutoDTO | null> {
    try {
      const resultado = await database.query(
        `
          ${SELECT_PRODUTO_COMPLETO}

          WHERE p.id_produto = $1
        `,
        [id]
      );

      if (resultado.rows.length === 0) {
        return null;
      }

      return mapRow(resultado.rows[0]);

    } catch (error) {
      console.error(
        "[Produto] Erro ao buscar produto:",
        error
      );

      return null;
    }
  }


  // ==========================================================
  // CADASTRAR PRODUTO
  // ==========================================================

  static async cadastrarProduto(
    produto: ProdutoDTO
  ): Promise<boolean> {

    const client = await database.connect();

    try {
      await client.query("BEGIN");


      // ======================================================
      // CADASTRAR PRODUTO PRINCIPAL
      // ======================================================

      const resultadoProduto = await client.query(
        `
          INSERT INTO produtos (
            cod_produto,
            nome,
            descricao,
            preco,
            estoque,
            imagem,
            id_categoria
          )

          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
          )

          RETURNING id_produto
        `,
        [
          produto.codProduto ?? null,
          produto.nome,
          produto.descricao ?? null,
          produto.preco,
          produto.estoque,
          produto.imagem ?? null,
          produto.idCategoria,
        ]
      );


      const idProduto = Number(
        resultadoProduto.rows[0].id_produto
      );


      // ======================================================
      // CADASTRAR DETALHES
      // ======================================================

      await client.query(
        `
          INSERT INTO detalhes_produto (
            id_produto,
            marca,
            genero,
            esporte,
            modalidade,
            faixa_etaria,
            linha,
            preco_anterior,
            desconto,
            parcelas,
            avaliacao,
            quantidade_avaliacoes,
            promocao,
            destaque
          )

          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12,
            $13,
            $14
          )
        `,
        [
          idProduto,

          produto.marca ?? "GRENÁ",

          produto.genero ?? "Unissex",

          produto.esporte ?? "Casual",

          produto.modalidade ?? "Casual",

          produto.faixaEtaria ?? "Adulto",

          produto.linha ?? "Essentials",

          produto.precoAnterior ?? produto.preco,

          produto.desconto ?? 0,

          produto.parcelas ?? 1,

          produto.avaliacao ?? 0,

          produto.quantidadeAvaliacoes ?? 0,

          produto.promocao ?? false,

          produto.destaque ?? false,
        ]
      );


      // ======================================================
      // CADASTRAR VARIAÇÕES
      // ======================================================

      const cores =
        produto.cores && produto.cores.length > 0
          ? produto.cores
          : ["Padrão"];

      const tamanhos =
        produto.tamanhos && produto.tamanhos.length > 0
          ? produto.tamanhos
          : ["Único"];


      for (const cor of cores) {
        for (const tamanho of tamanhos) {

          await client.query(
            `
              INSERT INTO variacoes_produto (
                id_produto,
                cor,
                tamanho,
                estoque
              )

              VALUES (
                $1,
                $2,
                $3,
                $4
              )

              ON CONFLICT (
                id_produto,
                cor,
                tamanho
              )

              DO UPDATE SET
                estoque = EXCLUDED.estoque
            `,
            [
              idProduto,
              cor,
              tamanho,
              produto.estoque,
            ]
          );
        }
      }


      // ======================================================
      // CADASTRAR CARACTERÍSTICAS
      // ======================================================

      if (
        produto.caracteristicas &&
        produto.caracteristicas.length > 0
      ) {

        for (
          const caracteristica
          of produto.caracteristicas
        ) {

          await client.query(
            `
              INSERT INTO caracteristicas_produto (
                id_produto,
                nome,
                valor
              )

              VALUES (
                $1,
                $2,
                $3
              )
            `,
            [
              idProduto,
              caracteristica.nome,
              caracteristica.valor,
            ]
          );
        }
      }


      await client.query("COMMIT");

      return true;

    } catch (error) {

      await client.query("ROLLBACK");

      console.error(
        "[Produto] Erro ao cadastrar produto:",
        error
      );

      return false;

    } finally {

      client.release();
    }
  }


  // ==========================================================
  // ATUALIZAR PRODUTO
  // ==========================================================

  static async atualizarProduto(
    id: number,
    produto: ProdutoDTO
  ): Promise<boolean> {

    const client = await database.connect();

    try {

      await client.query("BEGIN");


      // ======================================================
      // ATUALIZAR PRODUTO PRINCIPAL
      // ======================================================

      const resultado = await client.query(
        `
          UPDATE produtos

          SET
            cod_produto = $1,
            nome = $2,
            descricao = $3,
            preco = $4,
            estoque = $5,
            imagem = $6,
            id_categoria = $7

          WHERE id_produto = $8

          RETURNING id_produto
        `,
        [
          produto.codProduto ?? null,
          produto.nome,
          produto.descricao ?? null,
          produto.preco,
          produto.estoque,
          produto.imagem ?? null,
          produto.idCategoria,
          id,
        ]
      );


      if (resultado.rows.length === 0) {

        await client.query("ROLLBACK");

        return false;
      }


      // ======================================================
      // ATUALIZAR DETALHES
      // ======================================================

      await client.query(
        `
          INSERT INTO detalhes_produto (
            id_produto,
            marca,
            genero,
            esporte,
            modalidade,
            faixa_etaria,
            linha,
            preco_anterior,
            desconto,
            parcelas,
            avaliacao,
            quantidade_avaliacoes,
            promocao,
            destaque
          )

          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12,
            $13,
            $14
          )

          ON CONFLICT (id_produto)

          DO UPDATE SET
            marca =
              EXCLUDED.marca,

            genero =
              EXCLUDED.genero,

            esporte =
              EXCLUDED.esporte,

            modalidade =
              EXCLUDED.modalidade,

            faixa_etaria =
              EXCLUDED.faixa_etaria,

            linha =
              EXCLUDED.linha,

            preco_anterior =
              EXCLUDED.preco_anterior,

            desconto =
              EXCLUDED.desconto,

            parcelas =
              EXCLUDED.parcelas,

            avaliacao =
              EXCLUDED.avaliacao,

            quantidade_avaliacoes =
              EXCLUDED.quantidade_avaliacoes,

            promocao =
              EXCLUDED.promocao,

            destaque =
              EXCLUDED.destaque
        `,
        [
          id,

          produto.marca ?? "GRENÁ",

          produto.genero ?? "Unissex",

          produto.esporte ?? "Casual",

          produto.modalidade ?? "Casual",

          produto.faixaEtaria ?? "Adulto",

          produto.linha ?? "Essentials",

          produto.precoAnterior ?? produto.preco,

          produto.desconto ?? 0,

          produto.parcelas ?? 1,

          produto.avaliacao ?? 0,

          produto.quantidadeAvaliacoes ?? 0,

          produto.promocao ?? false,

          produto.destaque ?? false,
        ]
      );


      // ======================================================
      // ATUALIZAR VARIAÇÕES
      // ======================================================

      if (
        produto.cores !== undefined ||
        produto.tamanhos !== undefined
      ) {

        await client.query(
          `
            DELETE FROM variacoes_produto
            WHERE id_produto = $1
          `,
          [id]
        );


        const cores =
          produto.cores &&
          produto.cores.length > 0
            ? produto.cores
            : ["Padrão"];


        const tamanhos =
          produto.tamanhos &&
          produto.tamanhos.length > 0
            ? produto.tamanhos
            : ["Único"];


        for (const cor of cores) {

          for (const tamanho of tamanhos) {

            await client.query(
              `
                INSERT INTO variacoes_produto (
                  id_produto,
                  cor,
                  tamanho,
                  estoque
                )

                VALUES (
                  $1,
                  $2,
                  $3,
                  $4
                )

                ON CONFLICT (
                  id_produto,
                  cor,
                  tamanho
                )

                DO UPDATE SET
                  estoque = EXCLUDED.estoque
              `,
              [
                id,
                cor,
                tamanho,
                produto.estoque,
              ]
            );
          }
        }
      }


      // ======================================================
      // ATUALIZAR CARACTERÍSTICAS
      // ======================================================

      if (
        produto.caracteristicas !== undefined
      ) {

        await client.query(
          `
            DELETE FROM caracteristicas_produto
            WHERE id_produto = $1
          `,
          [id]
        );


        for (
          const caracteristica
          of produto.caracteristicas
        ) {

          await client.query(
            `
              INSERT INTO caracteristicas_produto (
                id_produto,
                nome,
                valor
              )

              VALUES (
                $1,
                $2,
                $3
              )
            `,
            [
              id,
              caracteristica.nome,
              caracteristica.valor,
            ]
          );
        }
      }


      await client.query("COMMIT");

      return true;

    } catch (error) {

      await client.query("ROLLBACK");

      console.error(
        "[Produto] Erro ao atualizar produto:",
        error
      );

      return false;

    } finally {

      client.release();
    }
  }


  // ==========================================================
  // REMOVER PRODUTO
  // ==========================================================

  static async removerProduto(
    id: number
  ): Promise<boolean> {

    try {

      const resultado = await database.query(
        `
          DELETE FROM produtos
          WHERE id_produto = $1
          RETURNING id_produto
        `,
        [id]
      );


      return resultado.rows.length > 0;

    } catch (error) {

      console.error(
        "[Produto] Erro ao remover produto:",
        error
      );

      return false;
    }
  }
}


// ============================================================
// DEFAULT EXPORT
// Necessário porque ProdutoController.ts utiliza:
//
// import Produto from "../model/Produto.js";
// ============================================================

export default Produto;