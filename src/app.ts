import "dotenv/config";
import DatabaseModel from "./model/DatabaseModel.js";
import { server } from "./server.js";

const port: number = Number(process.env.PORT) || 3333;
const host: string = process.env.HOST ?? "localhost";

const startServer = async () => {
    try {
        console.info("🔌 BACKDOORS: Testando conexão com o banco...");
        const dbModel = new DatabaseModel();

        const ok = await dbModel.testarConexao();

        if (ok) {
            server.listen(port, () => {
                console.info(`🟢 Servidor online: http://${host}:${port}`);
            });
        } else {
            console.error("❌ Erro: Banco de dados inacessível. Verifique o .env");
            process.exit(1);
        }
    } catch (error) {
        console.error("💀 Erro fatal ao iniciar o servidor:", error);
        process.exit(1);
    }
};

startServer();