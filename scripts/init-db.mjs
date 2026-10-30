// Uso: npm run db:init
// Executa infra/sql/init.sql no banco configurado no .env (não precisa do psql instalado).
// ATENÇÃO: o script SQL apaga e recria as tabelas.
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

if (process.env.NODE_ENV === "production" && !process.argv.includes("--force")) {
    console.error("Recusado: NODE_ENV=production. Este script apaga todas as tabelas. Use --force se for realmente intencional.");
    process.exit(1);
}

const config = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT) || 5432,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
      };
if (process.env.DB_SSL === "true") config.ssl = { rejectUnauthorized: false };

const sql = fs.readFileSync(path.join(process.cwd(), "infra", "sql", "init.sql"), "utf8");
const client = new pg.Client(config);

try {
    await client.connect();
    await client.query(sql);
    console.log("✅ Banco inicializado com sucesso (tabelas, triggers e dados de exemplo).");
} catch (erro) {
    console.error("❌ Falha ao inicializar o banco:", erro.message);
    process.exitCode = 1;
} finally {
    await client.end();
}
