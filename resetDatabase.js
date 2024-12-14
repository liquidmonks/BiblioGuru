import dotenv from "dotenv";
import mongoose from "mongoose";
import Loan from "./models/Loan.js"; // Adjust the path to your Loan model
import Book from "./models/Book.js"; // Adjust the path to your Book model

dotenv.config();
const mongoUri = process.env.MONGO_URI;


const clearData = async () => {
    try {
        // Replace 'your-mongodb-uri' with your actual MongoDB connection string
        await mongoose.connect("your-mongodb-uri", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB...");

        // Delete all loans
        await Loan.deleteMany({});
        console.log("All loans cleared.");

        // Reset all books to 'Available'
        await Book.updateMany({}, {borrowed: false, borrower: null});
        console.log("All books reset to 'Available'.");

        mongoose.connection.close();
        console.log("Database reset complete.");
    } catch (err) {
        console.error("Error resetting database:", err);
        process.exit(1);
    }
};

clearData();
