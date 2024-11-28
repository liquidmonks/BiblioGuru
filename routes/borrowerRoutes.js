const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');

// CRUD routes for borrowers
router.get('/', borrowerController.getAllBorrowers);
router.post('/', borrowerController.addBorrower);
router.get('/:id', borrowerController.getBorrowerById);
router.put('/:id', borrowerController.updateBorrower);
router.delete('/:id', borrowerController.deleteBorrower);

module.exports = router;
