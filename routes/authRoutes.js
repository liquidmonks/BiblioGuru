import express from 'express';
import {adminLogin} from '../controllers/authController.js';

const router = express.Router();

// Example route for admin login
router.post('/login', adminLogin);

export default router;
