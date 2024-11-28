const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    imageUrl: String,
    borrowed: {
        type: Boolean,
        default: false,
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Borrower',
        default: null,
    },
});

module.exports = mongoose.model('Book', BookSchema);
