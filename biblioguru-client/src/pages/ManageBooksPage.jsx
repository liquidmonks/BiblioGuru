import {useEffect, useState} from 'react';
import axios from 'axios';

function ManageBooksPage() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [editBook, setEditBook] = useState(null);

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

    const handleAddBook = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/books', {title, author});
            setBooks([...books, response.data]);
            setTitle('');
            setAuthor('');
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleEdit = (book) => {
        setEditBook(book);
        setTitle(book.title);
        setAuthor(book.author);
    };

    const handleUpdateBook = async () => {
        try {
            await axios.put(`http://localhost:5000/api/books/${editBook._id}`, {title, author});
            setEditBook(null);
            window.location.reload(); // Refresh the list after updating
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${bookId}`);
            setBooks(books.filter((book) => book._id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-red-200 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Manage Books</h1>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">{editBook ? 'Edit Book' : 'Add Book'}</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={editBook ? handleUpdateBook : handleAddBook}
                        className={`${
                            editBook ? 'bg-blue-500' : 'bg-green-500'
                        } text-white px-4 py-2 rounded-md hover:${
                            editBook ? 'bg-blue-600' : 'bg-green-600'
                        }`}
                    >
                        {editBook ? 'Update Book' : 'Add Book'}
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Existing Books</h2>
                    {books.map((book) => (
                        <div key={book._id}
                             className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-md">
                            <div>
                                <p className="text-lg font-semibold">{book.title}</p>
                                <p className="text-sm text-gray-600">By {book.author}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleEdit(book)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(book._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageBooksPage;
