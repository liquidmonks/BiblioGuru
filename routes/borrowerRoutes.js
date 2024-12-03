import express from 'express';
import {
    deleteBorrower,
    getAllBorrowers,
    loginBorrower,
    registerBorrower,
    updateBorrower
} from '../controllers/borrowerController.js';

const router = express.Router();

router.get('/', getAllBorrowers);
router.post('/register', registerBorrower);
router.post('/login', loginBorrower);
router.put('/:id', updateBorrower); // Update borrower details
router.delete('/:id', deleteBorrower); // Delete a borrower

export default router;
