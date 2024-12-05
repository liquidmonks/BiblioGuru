import express from 'express';
import {borrowBook, getAllLoans, getLoanHistory, returnBook} from '../controllers/loanController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Loan management routes
router.post('/borrow/:id', protect, borrowBook);
router.post('/return/:id', protect, returnBook); // Changed to use loan ID
router.get('/history', protect, getLoanHistory);
router.get('/', protect, getAllLoans); // Admin route to get all loans

export default router;
