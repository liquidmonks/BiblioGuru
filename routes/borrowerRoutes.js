import express from 'express';
import {
    addBorrower,
    deleteBorrower,
    getAllBorrowers,
    getBorrowerById,
    updateBorrower,
} from '../controllers/borrowerController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin routes to manage borrowers (protected)
router.get('/', protect, getAllBorrowers);
router.post('/', protect, addBorrower);
router.get('/:id', protect, getBorrowerById);
router.put('/:id', protect, updateBorrower);
router.delete('/:id', protect, deleteBorrower);

export default router;
