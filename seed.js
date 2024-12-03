import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js'; // Adjust the import path as needed

dotenv.config(); // Load environment variables from .env file

const seedBooks = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const books = [
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                imageUrl: 'https://m.media-amazon.com/images/I/81QuEGw8VPL.jpg',
            },
            {
                title: '1984',
                author: 'George Orwell',
                imageUrl: 'https://m.media-amazon.com/images/I/71rpa1-kyvL._AC_UF1000,1000_QL80_.jpg',
            },
            {
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                imageUrl: 'https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg',
            },
            {
                title: 'The Catcher in the Rye',
                author: 'J.D. Salinger',
                imageUrl: 'https://m.media-amazon.com/images/I/8125BDk3l9L.jpg',
            },
            {
                title: 'Moby Dick',
                author: 'Herman Melville',
                imageUrl: 'https://m.media-amazon.com/images/I/71d5wo+-MuL.jpg',
            },
        ];

        await Book.insertMany(books);
        console.log('Books seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding books:', error);
        process.exit(1);
    }
};

seedBooks();
