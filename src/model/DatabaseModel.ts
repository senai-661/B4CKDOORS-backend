import pkg from "pg";
import "dotenv/config";
import { CATALOGO_FILTROS, MARCAS_INICIAIS } from "../data/catalogoFiltros.js";

const { Pool } = pkg;

export class DatabaseModel {
    private _pool: pkg.Pool;

    constructor() {
        this._pool = new Pool({
            host:     process.env.DB_HOST,
            port:     Number(process.env.DB_PORT) || 5432,
            user:     process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    public async testarConexao(): Promise<boolean> {
        try {
            const client = await this._pool.connect();
            client.release();
            console.log("✅ Conectado ao banco com sucesso!");
            return true;
        } catch (error) {
            console.error("❌ Erro ao conectar no banco:", error);
            return false;
        }
    }

    /**
     * Garante que as colunas usadas pelo código existam (idempotente).
     * Evita o erro 500 "Erro ao listar usuários" quando o banco é antigo.
     */
    public async migrar(): Promise<void> {
        const q = (sql: string, params?: unknown[]) => this._pool.query(sql, params);

        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS imagem TEXT`);
        await q(`ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS telefone VARCHAR(20)`);

        // ── Marcas: tabela própria, ligada ao produto por id_marca ─────────────
        await q(`
            CREATE TABLE IF NOT EXISTS marca (
                id_marca   SERIAL PRIMARY KEY,
                nome       VARCHAR(80) NOT NULL UNIQUE,
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            )
        `);
        await q(
            `INSERT INTO marca (nome) SELECT unnest($1::text[]) ON CONFLICT (nome) DO NOTHING`,
            [MARCAS_INICIAIS]
        );

        // ── Colunas que os filtros da loja precisam ────────────────────────────
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS id_marca INTEGER REFERENCES marca(id_marca) ON DELETE SET NULL`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS genero VARCHAR(30)`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS esporte VARCHAR(40)`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS faixa_etaria VARCHAR(30)`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS cores TEXT[] NOT NULL DEFAULT '{}'`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS tamanhos TEXT[] NOT NULL DEFAULT '{}'`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS promocao BOOLEAN NOT NULL DEFAULT FALSE`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS desconto INTEGER NOT NULL DEFAULT 0`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS preco_anterior NUMERIC(10,2)`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS parcelas INTEGER`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS linha VARCHAR(80)`);
        await q(`ALTER TABLE produtos ADD COLUMN IF NOT EXISTS caracteristicas JSONB NOT NULL DEFAULT '[]'::jsonb`);

        // ── Bancos que usavam a coluna de texto "marca" (script antigo do pgAdmin) ─
        const antiga = await q(
            `SELECT 1 FROM information_schema.columns
              WHERE table_schema = current_schema() AND table_name = 'produtos' AND column_name = 'marca'`
        );
        if (antiga.rows.length > 0) {
            await q(`INSERT INTO marca (nome)
                     SELECT DISTINCT trim(marca) FROM produtos
                      WHERE marca IS NOT NULL AND trim(marca) <> ''
                        AND NOT EXISTS (SELECT 1 FROM marca m WHERE lower(m.nome) = lower(trim(produtos.marca)))
                     ON CONFLICT (nome) DO NOTHING`);
            await q(`UPDATE produtos p SET id_marca = m.id_marca
                       FROM marca m
                      WHERE p.id_marca IS NULL AND lower(m.nome) = lower(trim(p.marca))`);
            await q(`ALTER TABLE produtos DROP COLUMN marca`);
            console.log("✅ Coluna de texto \"marca\" convertida para id_marca.");
        }

        // ── Preenche os filtros dos produtos do catálogo que ainda estão vazios ─
        await q(`
            UPDATE produtos p SET
                id_marca       = COALESCE(p.id_marca, m.id_marca),
                genero         = COALESCE(p.genero, c.genero),
                esporte        = COALESCE(p.esporte, c.esporte),
                faixa_etaria   = COALESCE(p.faixa_etaria, c."faixaEtaria"),
                cores          = CASE WHEN cardinality(p.cores)    = 0 THEN c.cores    ELSE p.cores    END,
                tamanhos       = CASE WHEN cardinality(p.tamanhos) = 0 THEN c.tamanhos ELSE p.tamanhos END,
                desconto       = CASE WHEN p.desconto = 0 AND NOT p.promocao THEN c.desconto ELSE p.desconto END,
                preco_anterior = COALESCE(p.preco_anterior, c."precoAnterior"),
                promocao       = p.promocao OR c.promocao
              FROM jsonb_to_recordset($1::jsonb) AS c(
                       nome text, marca text, genero text, esporte text, "faixaEtaria" text,
                       desconto int, "precoAnterior" numeric, promocao boolean, cores text[], tamanhos text[]
                   )
              LEFT JOIN marca m ON lower(m.nome) = lower(c.marca)
             WHERE lower(p.nome) = lower(c.nome)
               AND (p.genero IS NULL OR p.esporte IS NULL OR p.id_marca IS NULL OR cardinality(p.tamanhos) = 0)
        `, [JSON.stringify(CATALOGO_FILTROS)]);

        console.log("✅ Migração de colunas verificada (marcas e filtros incluídos).");
    }

    public get pool(): pkg.Pool {
        return this._pool;
    }
}

// Exportação padrão para o app.ts reconhecer
export default DatabaseModel;