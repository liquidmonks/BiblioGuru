import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Borrower',
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    status: {
        type: String,
        enum: ['Borrowed', 'Returned', 'Verification'],
        required: true,
        default: 'Verification', // Default to verification phase
    },
    borrowedDate: Date,
    dueDate: Date,
    returnedDate: Date,
});

const Loan = mongoose.model('Loan', LoanSchema);
export default Loan;
