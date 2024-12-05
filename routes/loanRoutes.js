import express from 'express';
import {approveLoan, borrowBook, getAllLoans, getLoanHistory, returnBook} from '../controllers/loanController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Loan management routes
router.post('/borrow/:id', protect, borrowBook);
router.post('/return/:id', protect, returnBook);
router.get('/history', protect, getLoanHistory);
router.get('/', protect, getAllLoans); // Admin route to get all loans
router.post('/approve/:id', protect, approveLoan); // Admin approval route

export default router;
