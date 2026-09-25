// src/routes/clienteRoutes.ts
import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const clienteController = new ClienteController();

router.post('/', clienteController.criar);
router.get('/', authMiddleware, clienteController.listar);
router.get('/:id', authMiddleware, clienteController.buscarPorId);
router.put('/:id', authMiddleware, clienteController.atualizar);
router.delete('/:id', authMiddleware, clienteController.remover);

export default router;
