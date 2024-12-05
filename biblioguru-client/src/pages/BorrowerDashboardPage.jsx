import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

function BorrowerDashboardPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [token]);

    const handleBorrowBook = async (bookId) => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:5000/api/loans/borrow/${bookId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response?.data?.message || 'Book borrowed successfully.');
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error('Error borrowing book:', error);
            toast.error(
                error?.response?.data?.error || 'Failed to borrow book.'
            );
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-200 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Available Books</h1>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <div key={book._id} className="bg-gray-100 p-4 rounded shadow-md">
                                <img src={book.imageUrl} alt={book.title} className="h-40 object-cover mb-4"/>
                                <h2 className="text-xl font-bold">{book.title}</h2>
                                <p className="text-gray-600">By {book.author}</p>
                                <button
                                    onClick={() => handleBorrowBook(book._id)}
                                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Borrow'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No books available to borrow.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BorrowerDashboardPage;
