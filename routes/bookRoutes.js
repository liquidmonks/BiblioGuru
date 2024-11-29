import express from 'express';
import {addBook, deleteBook, getAllBooks, getBookById, updateBook} from '../controllers/bookController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// CRUD routes for books
router.get('/', getAllBooks);
router.post('/', protect, addBook);
router.get('/:id', protect, getBookById);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

export default router;
