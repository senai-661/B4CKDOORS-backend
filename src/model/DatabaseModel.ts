// src/model/DatabaseModel.ts
import pkg from "pg";
import type { PoolClient, PoolConfig } from "pg";
import { env } from "../config/env.js";

const { Pool } = pkg;

function criarConfig(): PoolConfig {
    const config: PoolConfig = env.db.url
        ? { connectionString: env.db.url }
        : {
              host: env.db.host,
              port: env.db.port,
              user: env.db.user,
              password: env.db.password,
              database: env.db.database,
          };
    // Bancos gerenciados (Render, Neon, Supabase...) normalmente exigem SSL.
    if (env.db.ssl) config.ssl = { rejectUnauthorized: false };
    return config;
}

// UM único pool compartilhado por toda a aplicação
// (antes cada model criava o seu próprio pool, multiplicando as conexões).
const poolCompartilhado: pkg.Pool = new Pool(criarConfig());

poolCompartilhado.on("error", (erro) => {
    console.error("[DB] Erro inesperado em conexão ociosa do pool:", erro.message);
});

export class DatabaseModel {
    public async testarConexao(): Promise<boolean> {
        try {
            const client = await poolCompartilhado.connect();
            client.release();
            console.log("✅ Conectado ao banco com sucesso!");
            return true;
        } catch (error) {
            console.error("❌ Erro ao conectar no banco:", error instanceof Error ? error.message : error);
            return false;
        }
    }

    public get pool(): pkg.Pool {
        return poolCompartilhado;
    }
}

/** Executa `fn` dentro de uma transação (COMMIT em sucesso, ROLLBACK em erro). */
export async function comTransacao<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await poolCompartilhado.connect();
    try {
        await client.query("BEGIN");
        const resultado = await fn(client);
        await client.query("COMMIT");
        return resultado;
    } catch (error) {
        await client.query("ROLLBACK").catch(() => undefined);
        throw error;
    } finally {
        client.release();
    }
}
