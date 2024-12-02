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

// Get a book by ID
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({error: 'Book not found'});
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Add a new book
export const addBook = async (req, res) => {
    try {
        const {title, author, imageUrl} = req.body;
        const newBook = new Book({title, author, imageUrl});
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Update a book
export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedBook) {
            return res.status(404).json({error: 'Book not found'});
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({error: 'Book not found'});
        }
        res.json({message: 'Book deleted successfully'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
};
