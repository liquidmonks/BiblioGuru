const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const protect = require('../middleware/authMiddleware');

// CRUD routes for books
router.get('/', bookController.getAllBooks);
router.post('/', protect, bookController.addBook);
router.get('/:id', protect, bookController.getBookById);
router.put('/:id', protect, bookController.updateBook);
router.delete('/:id', protect, bookController.deleteBook);

module.exports = router;
