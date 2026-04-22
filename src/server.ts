import app from "./app.js"; // Importa o default do app.ts
import { DatabaseModel } from "./model/DatabaseModel.js";

const port: number = 3333;

const db = new DatabaseModel();

// Usando o pool diretamente para testar a conexão
db.pool.connect()
    .then((client) => {
        console.log("✅ Banco de Dados conectado com sucesso!");
        client.release(); // Libera o cliente de teste
        
        app.listen(port, () => {
            console.log(`🚀 B4CKDOORS rodando em http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ Erro ao conectar no banco:", err.message);
        process.exit(1); // Fecha o app se o banco não subir
    });