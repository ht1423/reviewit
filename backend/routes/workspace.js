import express from 'express';
import { createWorkspace, getWorkspace } from '../controllers/workspace.js';
import authMiddleware from '../authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, createWorkspace);
router.get('/:publicURL', getWorkspace);

export default router;
