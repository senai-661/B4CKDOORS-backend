import { app } from "./app.js";
import { DatabaseModel } from "./model/DatabaseModel.js";

const port = process.env.PORT || 3333;

new DatabaseModel().testarConexao().then((resbd: boolean) => {
    if (resbd) {
        app.listen(port, () => {
            console.log(`🚀 Servidor rodando na porta ${port}`);
        });
    } else {
        console.log("❌ Não foi possível conectar ao banco de dados");
    }
});