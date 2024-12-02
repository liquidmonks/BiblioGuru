import Book from '../models/Book.js';
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

        book.borrowed = true;
        book.borrower = borrowerId;
        await book.save();

        // Update the borrower to reflect the borrowed book
        const borrower = await Borrower.findById(borrowerId);
        borrower.borrowedBooks.push(book._id);
        await borrower.save();

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

        book.borrowed = false;
        const borrowerId = book.borrower;
        book.borrower = null;
        await book.save();

        // Update borrower to remove the returned book
        const borrower = await Borrower.findById(borrowerId);
        borrower.borrowedBooks = borrower.borrowedBooks.filter(
            (borrowedBook) => borrowedBook.toString() !== book._id.toString()
        );
        await borrower.save();

        res.status(200).json({message: 'Book returned successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};
