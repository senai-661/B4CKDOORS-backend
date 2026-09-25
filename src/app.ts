// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

export default app;
