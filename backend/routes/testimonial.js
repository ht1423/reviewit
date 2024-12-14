import express from 'express';
import createTestimonial from '../controllers/testimonial.js';
import authMiddleware from '../authMiddleware.js';
const router = express.Router();

router.post('/:workspaceId', authMiddleware, createTestimonial);

export default router;
