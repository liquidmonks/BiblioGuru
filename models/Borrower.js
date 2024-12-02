import mongoose from 'mongoose';

const BorrowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email uniqueness
    },
    password: {
        type: String,
        required: true,
    },
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
    borrowDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: Date,
});

const Borrower = mongoose.model('Borrower', BorrowerSchema);
export default Borrower;
