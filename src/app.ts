// src/app.ts  (ponto de entrada)
import { env } from "./config/env.js";
import { server } from "./server.js";
import { DatabaseModel } from "./model/DatabaseModel.js";
import { Usuario } from "./model/Usuario.js";
import { compararSenha } from "./utils/senha.js";

const port: number = env.port; // process.env.PORT || 3333

/** Em produção, avisa se o admin ainda usa a senha padrão do seed. */
async function avisarSenhaPadrao(): Promise<void> {
    if (!env.isProd) return;
    try {
        const admin = await Usuario.buscarParaLogin("admin@grena.com");
        if (admin && (await compararSenha("admin123", admin.senhaHash))) {
            console.warn("⚠️  SEGURANÇA: o admin@grena.com ainda usa a senha padrão. Troque-a imediatamente.");
        }
    } catch {
        /* aviso é opcional: ignora falhas */
    }
}

new DatabaseModel().testarConexao().then(async (conectou: boolean) => {
    if (!conectou) {
        console.log("❌ Não foi possível conectar ao banco de dados");
        process.exit(1);
    }
    server.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta ${port} (${env.nodeEnv})`);
    });
    await avisarSenhaPadrao();
});
