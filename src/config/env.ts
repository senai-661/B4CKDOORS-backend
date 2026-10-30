// src/config/env.ts
// Carrega e VALIDA as variáveis de ambiente na inicialização.
// Se algo essencial estiver faltando, o servidor não sobe (fail fast).
import dotenv from "dotenv";

dotenv.config();

const nodeEnv = process.env.NODE_ENV ?? "development";
const isProd = nodeEnv === "production";

function falhar(mensagem: string): never {
    console.error(`❌ Configuração inválida: ${mensagem}`);
    console.error("   Confira o arquivo .env (modelo em .env.example).");
    process.exit(1);
}

const jwtSecret = process.env.JWT_SECRET ?? "";
if (!jwtSecret) {
    falhar("JWT_SECRET não definido. Gere um com: node -e \"console.log(require('crypto').randomBytes(48).toString('hex'))\"");
}
if (isProd && jwtSecret.length < 32) {
    falhar("JWT_SECRET precisa ter pelo menos 32 caracteres em produção.");
}

// bcrypt: mínimo de 10 rounds (exigência do projeto); teto de 14 para não travar o servidor.
const roundsLidos = Number(process.env.BCRYPT_ROUNDS);
const bcryptRounds = Number.isInteger(roundsLidos) ? Math.min(Math.max(roundsLidos, 10), 14) : 10;

const trustProxyLido = Number(process.env.TRUST_PROXY);

export const env = {
    nodeEnv,
    isProd,
    port: Number(process.env.PORT || 3333),
    jwtSecret,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
    bcryptRounds,
    // Lista de origens permitidas no CORS (separadas por vírgula)
    frontendUrls: (process.env.FRONTEND_URL ?? "")
        .split(",")
        .map((u) => u.trim().replace(/\/$/, ""))
        .filter(Boolean),
    trustProxy: process.env.TRUST_PROXY && Number.isInteger(trustProxyLido) ? trustProxyLido : undefined,
    db: {
        url: process.env.DATABASE_URL || undefined,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: process.env.DB_SSL === "true",
    },
} as const;
