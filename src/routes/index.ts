// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './authRoutes';
import clienteRoutes from './clienteRoutes';
import produtoRoutes from './produtoRoutes';
import vendaRoutes from './vendaRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/clientes', clienteRoutes);
router.use('/produtos', produtoRoutes);
router.use('/vendas', vendaRoutes);

export default router;
