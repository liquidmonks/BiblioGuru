import Borrower from '../models/Borrower.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Get all borrowers
export const getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.find().populate('borrowedBooks');
        res.json(borrowers);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Register a new borrower
export const registerBorrower = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newBorrower = new Borrower({name, email, password: hashedPassword});
        const savedBorrower = await newBorrower.save();

        res.status(201).json(savedBorrower);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Update borrower details
export const updateBorrower = async (req, res) => {
    try {
        const borrowerId = req.params.id;
        const updates = req.body;

        const updatedBorrower = await Borrower.findByIdAndUpdate(borrowerId, updates, {new: true});
        if (!updatedBorrower) {
            return res.status(404).json({error: 'Borrower not found'});
        }

        res.status(200).json(updatedBorrower);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Delete a borrower
export const deleteBorrower = async (req, res) => {
    try {
        const borrowerId = req.params.id;
        const deletedBorrower = await Borrower.findByIdAndDelete(borrowerId);

        if (!deletedBorrower) {
            return res.status(404).json({error: 'Borrower not found'});
        }

        res.status(200).json({message: 'Borrower deleted successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Login function remains the same
export const loginBorrower = async (req, res) => {
    try {
        const {email, password} = req.body;
        const borrower = await Borrower.findOne({email});

        if (!borrower) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, borrower.password);
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign({id: borrower._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({token});
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({error: 'Server error'});
    }
};
