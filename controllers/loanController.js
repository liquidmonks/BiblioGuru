import Book from '../models/Book.js';
import Loan from '../models/Loan.js';

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

        // Create a new loan record
        const loan = new Loan({
            borrower: borrowerId,
            book: book._id,
            status: 'Borrowed'
        });

        await loan.save();

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
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({error: 'Book not found'});
        }

        if (!book.borrowed) {
            return res.status(400).json({error: 'Book is not borrowed'});
        }

        // Set the book as not borrowed
        book.borrowed = false;
        book.borrower = null;
        await book.save();

        // Update the loan record
        const loan = await Loan.findOne({book: book._id, status: 'Borrowed'});
        if (loan) {
            loan.returnedDate = Date.now();
            loan.status = 'Returned';
            await loan.save();
        }

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

// Get all loans (Admin view)
export const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('book').populate('borrower');

        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};
