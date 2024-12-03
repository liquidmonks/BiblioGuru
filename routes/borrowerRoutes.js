import express from 'express';
import {
    getAllBorrowers,
    loginBorrower,
    registerBorrower,
    updateBorrowerPassword
} from '../controllers/borrowerController.js';

const router = express.Router();

// CRUD routes for borrowers
router.get('/', getAllBorrowers);
router.post('/register', registerBorrower);
router.post('/login', loginBorrower);
router.put('/:id', updateBorrowerPassword); // New route for updating borrower's password

export default router;
