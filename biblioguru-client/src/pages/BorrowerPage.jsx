import {useEffect, useState} from 'react';
import axios from 'axios';

function BorrowerPage() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Welcome to the Library</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div
                            key={book._id}
                            className={`relative bg-white rounded-lg shadow-md p-6 transition-transform transform hover:-translate-y-1 ${
                                book.borrowed ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="w-full h-48 object-cover mb-4 rounded"
                            />
                            <h2 className="text-2xl font-semibold text-gray-800">{book.title}</h2>
                            <p className="text-gray-600 mb-4">By {book.author}</p>
                            {book.borrowed ? (
                                <span
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
                  Checked Out
                </span>
                            ) : (
                                <button
                                    className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm transition-opacity hover:opacity-80"
                                    onClick={() => alert('You need to register/login to borrow this book.')}
                                >
                                    Available
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BorrowerPage;
