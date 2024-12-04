import React, {useEffect, useState} from 'react';
import axios from 'axios';

function ManageLoansPage() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loans/all', {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                });
                setLoans(response.data);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };

        fetchLoans();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-200 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Manage Loans</h1>
                <p className="text-lg text-gray-600 text-center">
                    View and manage all the active loans and overdue items.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {loans.map((loan) => (
                        <div key={loan._id} className="bg-gray-100 p-4 rounded shadow-md">
                            <h2 className="text-xl font-bold">Book: "{loan.book.title}"</h2>
                            <p>Borrower: {loan.borrower.name}</p>
                            <p>Due Date: {new Date(loan.borrowedDate).toLocaleDateString()}</p>
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                                onClick={async () => {
                                    try {
                                        await axios.post(`http://localhost:5000/api/loans/return/${loan.book._id}`, {}, {
                                            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                                        });
                                        alert('Book marked as returned!');
                                        window.location.reload();
                                    } catch (error) {
                                        console.error('Error marking book as returned:', error);
                                    }
                                }}
                            >
                                Mark as Returned
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageLoansPage;
