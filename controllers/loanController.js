import Book from '../models/Book.js';
import Loan from '../models/Loan.js';
import Borrower from '../models/Borrower.js';

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
            status: 'Borrowed', // Added status to make sure it's clear
            borrowedDate: new Date(),
        });

        await loan.save();

        book.borrowed = true;
        book.borrower = borrowerId;
        await book.save();

        // Update borrower's loan record
        const borrower = await Borrower.findById(borrowerId);
        if (borrower) {
            borrower.borrowedBooks.push(book._id);
            await borrower.save();
        }

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

        const borrowerId = book.borrower;
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

        // Update borrower to remove the returned book
        const borrower = await Borrower.findById(borrowerId);
        if (borrower) {
            borrower.borrowedBooks = borrower.borrowedBooks.filter(
                (borrowedBook) => borrowedBook.toString() !== book._id.toString()
            );
            await borrower.save();
        }

        res.status(200).json({message: 'Book returned successfully'});
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
