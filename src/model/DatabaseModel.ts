import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export class DatabaseModel {
    private _pool: pkg.Pool;

    constructor() {
        // Se existir uma connection string (ex: DATABASE_URL do Supabase), usa-a diretamente.
        // Caso contrário, usa as variáveis individuais para testes locais.
        const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

        if (connectionString) {
            this._pool = new Pool({
                connectionString,
                ssl: {
                    rejectUnauthorized: false // Necessário para conexões seguras externas no Supabase/Render
                }
            });
        } else {
            this._pool = new Pool({
                host:     process.env.DB_HOST,
                port:     Number(process.env.DB_PORT) || 5432,
                user:     process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        }
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

    public get pool(): pkg.Pool {
        return this._pool;
    }
}