import {useEffect, useState} from 'react';
import axios from 'axios';

function ManageBooksPage() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({title: '', author: '', imageUrl: '', description: ''});

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleAddBook = async () => {
        try {
            await axios.post('http://localhost:5000/api/books', newBook);
            fetchBooks();
            setNewBook({title: '', author: '', imageUrl: '', description: ''});
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleDeleteBook = async (bookId) => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${bookId}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div>
            <h2>Manage Books</h2>
            <input type="text" value={newBook.title} onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                   placeholder="Title"/>
            {/* Add more input fields for author, imageUrl, and description */}
            <button onClick={handleAddBook}>Add Book</button>
            {books.map((book) => (
                <div key={book._id}>
                    <h3>{book.title}</h3>
                    <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ManageBooksPage;
