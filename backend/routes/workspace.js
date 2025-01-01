import express from 'express';
import authMiddleware from '../middleware.js';
import { createWorkspace, getWorkspace } from '../controllers/workspace.js';
const router = express.Router();

router.post('/create', authMiddleware, createWorkspace);
router.get('/get/:publicIdentifier', getWorkspace);

export default router;
