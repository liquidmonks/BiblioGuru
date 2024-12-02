import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';
import borrowerRoutes from './routes/borrowerRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Check if required environment variables are loaded correctly
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in .env');
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
}

// Connect to database
connectDB().catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/books', bookRoutes);
app.use('/api/borrowers', borrowerRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
