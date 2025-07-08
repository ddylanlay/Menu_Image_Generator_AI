import express from 'express';
import menuController from '../controllers/menuController.js';

const router = express.Router();

// POST /api/menu/upload
router.use('/', menuController);

export default router;