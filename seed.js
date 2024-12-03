import mongoose from 'mongoose';
import Book from './models/Book.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch((err) => {
        console.error('Database connection error:', err.message);
        process.exit(1);
    });

const seedBooks = async () => {
    const books = [
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
        },
        {
            title: '1984',
            author: 'George Orwell',
        },
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
        },
        {
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
        },
        {
            title: 'Moby Dick',
            author: 'Herman Melville',
        },
    ];

    try {
        await Book.deleteMany(); // Clear existing books
        await Book.insertMany(books);
        console.log('Sample books added to database.');
        process.exit();
    } catch (err) {
        console.error('Error seeding books:', err);
        process.exit(1);
    }
};

seedBooks();
