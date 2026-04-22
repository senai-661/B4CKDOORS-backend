import express from "express";
import cors from "cors";
import router from "./routes.js"; // Importe como default para evitar erros

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// EXPORTAÇÃO DEFAULT (MUITO IMPORTANTE)
export default app;