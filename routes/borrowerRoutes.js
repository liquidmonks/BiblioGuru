import express from 'express';
import {getAllBorrowers, loginBorrower, registerBorrower} from '../controllers/borrowerController.js';

const router = express.Router();

// CRUD routes for borrowers
router.get('/', getAllBorrowers);
router.post('/register', registerBorrower);
router.post('/login', loginBorrower);

export default router;
