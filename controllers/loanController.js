import Book from '../models/Book.js';
import Loan from '../models/Loan.js';
import moment from 'moment';

// Borrow a book (Request Verification)
export async function borrowBook(req, res) {
    try {
        const borrowerId = req.user.id;
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({error: 'Book not found'});
        }

        if (book.borrowed) {
            return res.status(400).json({error: 'Book is already borrowed'});
        }

        const existingLoan = await Loan.findOne({book: book._id, status: 'Verification'});
        if (existingLoan) {
            return res.status(400).json({error: 'Loan request already in verification'});
        }

        const dueDate = moment().add(14, 'days').toDate();

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
}

// Return a book (Request Verification)
export async function returnBook(req, res) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({error: 'Book not found'});
        }

        if (!book.borrowed) {
            return res.status(400).json({error: 'Book is not borrowed'});
        }

        const loan = await Loan.findOne({book: book._id, status: 'Borrowed'});
        if (loan) {
            loan.status = 'Verification';
            loan.returnedDate = new Date();
            await loan.save();
        }

        res.status(200).json({message: 'Return request is in verification'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
}

// Admin approves the loan
export async function approveLoan(req, res) {
    try {
        const loan = await Loan.findById(req.params.id).populate('book');
        if (!loan) {
            return res.status(404).json({error: 'Loan not found'});
        }

        if (loan.status !== 'Verification') {
            return res.status(400).json({error: 'Loan is not in verification state'});
        }

        if (loan.returnedDate) {
            loan.status = 'Returned';
            loan.book.borrowed = false;
            loan.book.borrower = null;
        } else {
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
}

// Get loan history for borrower
export async function getLoanHistory(req, res) {
    try {
        const borrowerId = req.user.id;
        const loans = await Loan.find({borrower: borrowerId}).populate('book');

        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
}

// Get all loans for admin
export async function getAllLoans(req, res) {
    try {
        const loans = await Loan.find().populate('book borrower');
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
}

// Verify return of a book
export async function verifyReturn(req, res) {
    try {
        const loan = await Loan.findById(req.params.id).populate('book');
        if (!loan) {
            return res.status(404).json({error: 'Loan not found'});
        }

        if (loan.status !== 'Returned') {
            return res.status(400).json({error: 'Book is not marked as returned'});
        }

        loan.verification = 'Verified';
        await loan.save();

        res.status(200).json({message: 'Book return verified successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
}
