const mongoose = require('mongoose');

const BorrowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
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

module.exports = mongoose.model('Borrower', BorrowerSchema);
