import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function BorrowerDashboardPage() {
    const [availableBooks, setAvailableBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/borrower-login');
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                setAvailableBooks(response.data.filter((book) => !book.borrowed));
                setBorrowedBooks(response.data.filter((book) => book.borrowed));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    const handleBorrowBook = async (bookId) => {
        if (!token) {
            alert('You need to register/login to borrow this book.');
            navigate('/borrower-login');
            return;
        }

        try {
            await axios.post(
                `http://localhost:5000/api/loans/borrow`,
                {bookId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.reload(); // Refresh the list after borrowing
        } catch (error) {
            console.error('Error borrowing book:', error);
        }
    };

    const handleReturnBook = async (bookId) => {
        try {
            await axios.post(
                `http://localhost:5000/api/loans/return`,
                {bookId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.reload(); // Refresh the list after returning
        } catch (error) {
            console.error('Error returning book:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/borrower-login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-200 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Borrower Dashboard</h1>
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-4">Available Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableBooks.map((book) => (
                            <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
                                <img src={book.imageUrl} alt={book.title}
                                     className="h-48 w-full object-cover mb-4 rounded"/>
                                <h3 className="text-2xl font-semibold mb-2">{book.title}</h3>
                                <p className="text-gray-600 mb-4">By {book.author}</p>
                                <button
                                    onClick={() => handleBorrowBook(book._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                >
                                    Borrow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-4">Borrowed Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {borrowedBooks.map((book) => (
                            <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
                                <img src={book.imageUrl} alt={book.title}
                                     className="h-48 w-full object-cover mb-4 rounded"/>
                                <h3 className="text-2xl font-semibold mb-2">{book.title}</h3>
                                <p className="text-gray-600 mb-4">By {book.author}</p>
                                <button
                                    onClick={() => handleReturnBook(book._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Return
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BorrowerDashboardPage;
