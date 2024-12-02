import express from 'express';
import {borrowBook, returnBook} from '../controllers/loanController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Borrow a book (requires authentication)
router.post('/borrow/:id', protect, borrowBook);
// Return a book (requires authentication)
router.post('/return/:id', protect, returnBook);

export default router;
