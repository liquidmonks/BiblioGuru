import React, {useEffect, useState} from 'react';
import axios from 'axios';

function ManageLoansPage() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loans', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setLoans(response.data);
            } catch (error) {
                console.error('Error fetching loans:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-200 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Manage Loans</h1>
                <p className="text-lg text-gray-600 text-center">
                    View and manage all the active loans and overdue items.
                </p>
                {loans.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {loans.map((loan) => (
                            <div key={loan._id} className="bg-gray-100 p-4 rounded shadow-md">
                                <h2 className="text-xl font-bold">Book: "{loan.book.title}"</h2>
                                <p>Borrower: {loan.borrower.name}</p>
                                <p>Due Date: {new Date(loan.borrowedDate).toLocaleDateString()}</p>
                                <button
                                    onClick={() => handleReturnLoan(loan.book._id)}
                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                                >
                                    Mark as Returned
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg text-gray-600 text-center mt-4">No loans to manage.</p>
                )}
            </div>
        </div>
    );
}

export default ManageLoansPage;
