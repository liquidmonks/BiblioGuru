import React, {useEffect, useState} from 'react';
import axios from 'axios';

function ManageLoansPage() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/loans', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoans(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching loans:', error);
                setLoading(false);
            }
        };
        fetchLoans();
    }, [token]);

    const handleMarkAsReturned = async (loanId) => {
        try {
            setLoading(true);
            await axios.post(`http://localhost:5000/api/loans/return/${loanId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            setLoans((prevLoans) =>
                prevLoans.map((loan) =>
                    loan._id === loanId ? {...loan, status: 'Returned', returnedDate: new Date()} : loan
                )
            );
        } catch (error) {
            console.error('Error marking loan as returned:', error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-200 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Manage Loans</h1>
                <p className="text-lg text-gray-600 text-center">
                    View and manage all the active loans and overdue items.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {loans.length > 0 ? (
                        loans.map((loan) => (
                            <div key={loan._id} className="bg-gray-100 p-4 rounded shadow-md">
                                <h2 className="text-xl font-bold">Book: {loan.book.title}</h2>
                                <p>Borrower: {loan.borrower.name}</p>
                                <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
                                <p>Status: {loan.status}</p>
                                {loan.status === 'Borrowed' && (
                                    <button
                                        onClick={() => handleMarkAsReturned(loan._id)}
                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : 'Mark as Returned'}
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No loans to manage.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageLoansPage;
