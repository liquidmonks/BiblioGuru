import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';
import borrowerRoutes from './routes/borrowerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import loanRoutes from './routes/loanRoutes.js'; // Import loan routes

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

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Allows express to parse JSON requests
app.use(cors()); // Enable CORS for all origins

// Define routes
app.use('/api/books', bookRoutes);
app.use('/api/borrowers', borrowerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes); // Add loan routes

// Error handling middleware (for better error reporting)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong!'});
});

// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).json({error: 'Route not found'});
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
