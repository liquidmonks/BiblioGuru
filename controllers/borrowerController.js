import Borrower from '../models/Borrower.js';

// Get all borrowers
export const getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.find().populate('borrowedBooks');
        res.json(borrowers);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Add a borrower
export const addBorrower = async (req, res) => {
    try {
        const {name, email, borrowedBooks} = req.body;
        const newBorrower = new Borrower({name, email, borrowedBooks});
        const savedBorrower = await newBorrower.save();
        res.status(201).json(savedBorrower);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Get a borrower by ID
export const getBorrowerById = async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id).populate('borrowedBooks');
        if (!borrower) {
            return res.status(404).json({error: 'Borrower not found'});
        }
        res.json(borrower);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Update a borrower
export const updateBorrower = async (req, res) => {
    try {
        const updatedBorrower = await Borrower.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedBorrower) {
            return res.status(404).json({error: 'Borrower not found'});
        }
        res.json(updatedBorrower);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Delete a borrower
export const deleteBorrower = async (req, res) => {
    try {
        const deletedBorrower = await Borrower.findByIdAndDelete(req.params.id);
        if (!deletedBorrower) {
            return res.status(404).json({error: 'Borrower not found'});
        }
        res.json({message: 'Borrower deleted successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};
