// src/routes/produtoRoutes.ts
import { Router } from 'express';
import { ProdutoController } from '../controllers/ProdutoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const produtoController = new ProdutoController();

router.post('/', authMiddleware, produtoController.criar);
router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscarPorId);
router.put('/:id', authMiddleware, produtoController.atualizar);
router.delete('/:id', authMiddleware, produtoController.remover);

export default router;
