import Book from '../models/Book.js';
import Loan from '../models/Loan.js';
import moment from 'moment'; // Use moment.js to handle dates

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

        // Set due date (e.g., 14 days from now)
        const dueDate = moment().add(14, 'days').toDate();

        // Create a new loan record
        const loan = new Loan({
            borrower: borrowerId,
            book: book._id,
            status: 'Borrowed',
            borrowedDate: new Date(),
            dueDate: dueDate
        });

        await loan.save();

        // Update book status
        book.borrowed = true;
        book.borrower = borrowerId;
        await book.save();

        res.status(200).json({message: 'Book borrowed successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Return a book
export const returnBook = async (req, res) => {
    try {
        const loanId = req.params.id;
        const loan = await Loan.findById(loanId).populate('book');

        if (!loan) {
            return res.status(404).json({error: 'Loan not found'});
        }

        if (loan.status !== 'Borrowed') {
            return res.status(400).json({error: 'Book is not currently borrowed'});
        }

        // Update book status
        const book = loan.book;
        book.borrowed = false;
        book.borrower = null;
        await book.save();

        // Update the loan record
        loan.returnedDate = new Date();
        loan.status = 'Returned';
        await loan.save();

        res.status(200).json({message: 'Book returned successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Get loan history for a borrower
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
