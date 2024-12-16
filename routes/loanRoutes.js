import express from 'express';
import {
    approveLoan,
    borrowBook,
    getAllLoans,
    getLoanHistory,
    returnBook,
    verifyReturn,
} from '../controllers/loanController.js';
import {adminOnly, protect} from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Loan management routes
 */

// Borrow a book (Protected route for borrowers)
router.post('/borrow/:id', protect, borrowBook);

// Return a book (Protected route for borrowers)
router.post('/return/:id', protect, returnBook);

// Borrower loan history (Protected route for borrowers)
router.get('/history', protect, getLoanHistory);

// Admin routes (Protected and Admin-only)
router.get('/', protect, adminOnly, getAllLoans); // Admin fetches all loans
router.post('/approve/:id', protect, adminOnly, approveLoan); // Admin approves loan
router.post('/verify-return/:id', protect, adminOnly, verifyReturn); // Admin verifies return

export default router;
