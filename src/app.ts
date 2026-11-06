import express from "express";
import cors from "cors";
import { router } from "./routes.js";

export const app = express(); // Exporta a app configurada

app.use(cors());
app.use(express.json());
app.use(router);