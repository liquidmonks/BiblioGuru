import Book from '../models/Book.js';

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Create a new book
export const createBook = async (req, res) => {
    try {
        const {title, author, imageUrl, description} = req.body;
        const newBook = new Book({title, author, imageUrl, description});
        const savedBook = await newBook.save();

        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Update book details
export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updates = req.body;

        const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {new: true});
        if (!updatedBook) {
            return res.status(404).json({error: 'Book not found'});
        }

        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({error: 'Book not found'});
        }

        res.status(200).json({message: 'Book deleted successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};
