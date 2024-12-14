import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

function BorrowerDashboardPage() {
    const [books, setBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
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
                toast.error('Failed to fetch books.');
            }
        };

        const fetchBorrowedBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loans/history', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBorrowedBooks(response.data);
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
                toast.error('Failed to fetch borrowed books.');
            }
        };

        fetchBooks();
        fetchBorrowedBooks();
    }, [token]);

    const handleBorrowBook = async (bookId) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `http://localhost:5000/api/loans/borrow`,
                {bookId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data.message || 'Book borrowed successfully.');
            setLoading(false);
            // Refresh books and borrowed books
            fetchBooks();
            fetchBorrowedBooks();
        } catch (error) {
            console.error('Error borrowing book:', error.response || error);
            toast.error(
                error.response?.data?.error || 'Failed to borrow book. Please try again.'
            );
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-200 p-8">
            <h1 className="text-4xl font-bold mb-6">Available Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
                        <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover mb-4"/>
                        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                        <p className="text-gray-600 mb-4">By {book.author}</p>
                        {book.status === 'Pending Approval' ? (
                            <p className="text-yellow-500">Pending Approval</p>
                        ) : (
                            <button
                                onClick={() => handleBorrowBook(book._id)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Borrow'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <h2 className="text-3xl font-bold mt-10">Borrowed Books</h2>
            <ul>
                {borrowedBooks.map((loan) => (
                    <li key={loan._id}>
                        {loan.book?.title || 'Unknown Book'} - Status: {loan.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BorrowerDashboardPage;
