import express from 'express';
import {borrowBook, returnBook} from '../controllers/loanController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Loan management routes
router.post('/borrow/:id', protect, borrowBook);
router.post('/return/:id', protect, returnBook);

export default router;
