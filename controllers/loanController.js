import Book from '../models/Book.js';


// Borrow a book
export const borrowBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({error: 'Book not found'});
        }

        if (book.borrowed) {
            return res.status(400).json({error: 'Book is already borrowed'});
        }

        book.borrowed = true;
        book.borrower = req.user.id; // assuming req.user contains the borrower
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
        if (!book || !book.borrowed) {
            return res.status(404).json({error: 'Book not found or not borrowed'});
        }

        book.borrowed = false;
        book.borrower = null;
        await book.save();

        res.status(200).json({message: 'Book returned successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};
