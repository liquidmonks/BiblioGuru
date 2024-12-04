import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BorrowerDashboardPage() {
    const [availableBooks, setAvailableBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loanHistory, setLoanHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/borrower-login');
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchBooksAndLoans = async () => {
            try {
                // Fetch all books
                const booksResponse = await axios.get('http://localhost:5000/api/books');
                setAvailableBooks(booksResponse.data.filter((book) => !book.borrowed));
                setBorrowedBooks(booksResponse.data.filter((book) => book.borrowed && book.borrower === getUserId()));

                // Fetch the borrower's loan history
                const loanResponse = await axios.get('http://localhost:5000/api/loans/history', {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setLoanHistory(loanResponse.data);
            } catch (error) {
                console.error('Error fetching books or loans:', error);
                toast.error('Unable to fetch data, please try again.');
            }
        };

        // Helper function to extract the user ID from the token (assuming JWT)
        const getUserId = () => {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.id;
            } catch (error) {
                console.error('Failed to extract user ID:', error);
                return null;
            }
        };

        fetchBooksAndLoans();
    }, [token]);

    const handleBorrowBook = async (bookId) => {
        try {
            setLoading(true);
            await axios.post(`http://localhost:5000/api/loans/borrow/${bookId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Book borrowed successfully!');
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error('Error borrowing book:', error);
            toast.error('Failed to borrow book.');
            setLoading(false);
        }
    };

    const handleReturnBook = async (bookId) => {
        try {
            setLoading(true);
            await axios.post(`http://localhost:5000/api/loans/return/${bookId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Book returned successfully!');
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error('Error returning book:', error);
            toast.error('Failed to return book.');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/borrower-login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-200 p-8">
            <ToastContainer/>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Borrower Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                {/* Available Books Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-4">Available Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableBooks.map((book) => (
                            <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-2xl font-semibold mb-2">{book.title}</h3>
                                <p className="text-gray-600 mb-4">By {book.author}</p>
                                <button
                                    onClick={() => handleBorrowBook(book._id)}
                                    disabled={loading}
                                    className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Processing...' : 'Borrow'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Borrowed Books Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-4">Borrowed Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {borrowedBooks.map((book) => (
                            <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-2xl font-semibold mb-2">{book.title}</h3>
                                <p className="text-gray-600 mb-4">By {book.author}</p>
                                <button
                                    onClick={() => handleReturnBook(book._id)}
                                    disabled={loading}
                                    className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Processing...' : 'Return'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Loan History Section */}
                <div>
                    <h2 className="text-3xl font-bold mb-4">Loan History</h2>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <ul>
                            {loanHistory.length > 0 ? (
                                loanHistory.map((loan) => (
                                    <li key={loan._id} className="mb-4">
                                        <strong>{loan.book.title}</strong> - Borrowed on:{' '}
                                        {new Date(loan.borrowedDate).toLocaleDateString()}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-600">No loan history found.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BorrowerDashboardPage;
