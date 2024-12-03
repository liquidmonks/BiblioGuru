import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Borrower from './models/Borrower.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    // Sample borrower data
    const sampleBorrowers = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: await bcrypt.hash('password123', 10), // hash the password before saving
        },
    ];

    try {
        // Clear existing data
        await Borrower.deleteMany();
        console.log('Existing borrowers deleted');

        // Insert sample data
        await Borrower.insertMany(sampleBorrowers);
        console.log('Sample borrower added to the database');

        // Disconnect
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding data:', err.message);
        process.exit(1);
    }
};

// Run the seeding function
seedData();
