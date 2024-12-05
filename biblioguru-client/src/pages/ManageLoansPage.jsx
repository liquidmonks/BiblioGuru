import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ManageLoansPage() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loans', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Filter loans to remove duplicate loan requests for the same book
                const uniqueLoans = filterUniqueLoans(response.data);
                setLoans(uniqueLoans);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };
        fetchLoans();
    }, [token]);

    const filterUniqueLoans = (loans) => {
        return loans.filter(
            (loan, index, self) =>
                index === self.findIndex((l) => l.book._id === loan.book._id && l.status === 'Verification')
        );
    };

    const handleApproveLoan = async (loanId) => {
        try {
            setLoading(true);
            await axios.post(`http://localhost:5000/api/loans/approve/${loanId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error('Error approving loan:', error);
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
                            <LoanCard
                                key={loan._id}
                                loan={loan}
                                loading={loading}
                                onApprove={() => handleApproveLoan(loan._id)}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No loans to manage.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function LoanCard({loan, loading, onApprove}) {
    return (
        <div className="bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-xl font-bold">Book: {loan.book.title}</h2>
            <p>Borrower: {loan.borrower.name}</p>
            <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
            <p>Status: {loan.status}</p>
            {loan.status === 'Verification' && (
                <button
                    onClick={onApprove}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Approve Loan'}
                </button>
            )}
        </div>
    );
}

// PropTypes validation for LoanCard component
LoanCard.propTypes = {
    loan: PropTypes.shape({
        status: PropTypes.string.isRequired,
        dueDate: PropTypes.string,
        book: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }).isRequired,
        borrower: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    onApprove: PropTypes.func.isRequired,
};

export default ManageLoansPage;
