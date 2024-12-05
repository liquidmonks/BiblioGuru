import Book from '../models/Book.js';
import Loan from '../models/Loan.js';
import moment from 'moment';

// Borrow a book
export const borrowBook = async (req, res) => {
    try {
        const borrowerId = req.user.id;
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({error: 'Book not found'});
        }

        if (book.borrowed) {
            return res.status(400).json({error: 'Book is already borrowed'});
        }

        // Check if there's already a loan in Verification status for this book
        const existingLoan = await Loan.findOne({book: book._id, status: 'Verification'});
        if (existingLoan) {
            return res.status(400).json({error: 'Loan request already in verification'});
        }

        // Set due date (e.g., 14 days from now)
        const dueDate = moment().add(14, 'days').toDate();

        // Create a new loan record in Verification state
        const loan = new Loan({
            borrower: borrowerId,
            book: book._id,
            status: 'Verification',
            borrowedDate: new Date(),
            dueDate: dueDate
        });

        await loan.save();

        res.status(200).json({message: 'Loan request is in verification'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Return a book
export const returnBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({error: 'Book not found'});
        }

        if (!book.borrowed) {
            return res.status(400).json({error: 'Book is not borrowed'});
        }

        // Update the loan status to Verification for admin approval
        const loan = await Loan.findOne({book: book._id, status: 'Borrowed'});
        if (loan) {
            loan.status = 'Verification';
            await loan.save();
        }

        res.status(200).json({message: 'Return request is in verification'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Admin approves the loan (either borrow or return)
export const approveLoan = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id).populate('book');
        if (!loan) {
            return res.status(404).json({error: 'Loan not found'});
        }

        if (loan.status !== 'Verification') {
            return res.status(400).json({error: 'Loan is not in verification state'});
        }

        if (loan.returnedDate) {
            // Approve a return
            loan.status = 'Returned';
            loan.book.borrowed = false;
            loan.book.borrower = null;
        } else {
            // Approve a borrow
            loan.status = 'Borrowed';
            loan.book.borrowed = true;
            loan.book.borrower = loan.borrower;
        }

        await loan.book.save();
        await loan.save();

        res.status(200).json({message: 'Loan approved successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Get loan history
export const getLoanHistory = async (req, res) => {
    try {
        const borrowerId = req.user.id;
        const loans = await Loan.find({borrower: borrowerId}).populate('book');

        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Get all loans for admin
export const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('book borrower');
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};
