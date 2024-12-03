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

        // Hash password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newBorrower = new Borrower({name, email, password: hashedPassword});
        const savedBorrower = await newBorrower.save();

        // Generate a JWT token for the newly registered borrower
        const token = jwt.sign({id: savedBorrower._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(201).json({token, borrower: savedBorrower});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Borrower login
export const loginBorrower = async (req, res) => {
    try {
        const {email, password} = req.body;
        const borrower = await Borrower.findOne({email});

        if (!borrower) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, borrower.password);
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        // Generate JWT token
        const token = jwt.sign({id: borrower._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({token});
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({error: 'Server error'});
    }
};

// Update borrower's password
export const updateBorrowerPassword = async (req, res) => {
    try {
        const {password} = req.body;
        const borrowerId = req.params.id;

        // Check if the borrower exists
        const borrower = await Borrower.findById(borrowerId);
        if (!borrower) {
            return res.status(404).json({error: 'Borrower not found'});
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(password, 10);
        borrower.password = hashedPassword;
        await borrower.save();

        res.status(200).json({message: 'Password updated successfully'});
    } catch (err) {
        console.error('Error updating borrower password:', err.message);
        res.status(500).json({error: 'Server error'});
    }
};
