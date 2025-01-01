import express from 'express';
import authMiddleware from '../middleware.js';
import createTestimonial from '../controllers/testimonial.js';
const router = express.Router();

router.post('/create/:workspaceId', authMiddleware, createTestimonial);

export default router;
