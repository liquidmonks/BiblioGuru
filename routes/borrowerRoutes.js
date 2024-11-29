const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');
const protect = require('../middleware/authMiddleware');

// CRUD routes for borrowers
router.get('/', protect, borrowerController.getAllBorrowers);
router.post('/', protect, borrowerController.addBorrower);
router.get('/:id', protect, borrowerController.getBorrowerById);
router.put('/:id', protect, borrowerController.updateBorrower);
router.delete('/:id', protect, borrowerController.deleteBorrower);

module.exports = router;
