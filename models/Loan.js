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
    borrowedDate: {
        type: Date,
        default: Date.now,
    },
    returnedDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Borrowed', 'Returned'],
        default: 'Borrowed',
    },
});

const Loan = mongoose.model('Loan', LoanSchema);
export default Loan;
