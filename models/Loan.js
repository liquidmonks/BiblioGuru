import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema(
    {
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        borrower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Returned'],
            default: 'Pending', // Initial state when loan is created
        },
        verification: {
            type: String,
            enum: ['Pending', 'Verified'],
            default: 'Pending', // Verification state for returned books
        },
        borrowedDate: {
            type: Date,
            default: Date.now,
        },
        returnDate: {
            type: Date,
            required: false,
        },
    },
    {timestamps: true}
);

export default mongoose.model('Loan', loanSchema);
