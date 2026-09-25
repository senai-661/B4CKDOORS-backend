// src/routes/vendaRoutes.ts
import { Router } from 'express';
import { VendaController } from '../controllers/VendaController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const vendaController = new VendaController();

router.post('/', authMiddleware, vendaController.registrar);
router.get('/', authMiddleware, vendaController.listar);
router.get('/cliente/:clienteId', authMiddleware, vendaController.listarPorCliente);

export default router;
