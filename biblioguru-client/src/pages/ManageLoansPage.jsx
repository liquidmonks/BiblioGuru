import React, {useEffect, useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function ManageLoansPage() {
    const [loans, setLoans] = useState([]);
    const token = localStorage.getItem('token'); // Retrieve token for authorization

    // Fetch loans data on component load
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loans', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token for secured routes
                    },
                });
                console.log('Fetched loans:', response.data);
                setLoans(response.data); // Populate loans data
            } catch (error) {
                console.error('Error fetching loans:', error);
                toast.error(
                    error.response?.data?.error || 'Failed to fetch loans. Please try again.'
                );
            }
        };

        fetchLoans();
    }, [token]);

    // Handle loan approval
    const handleApproveLoan = async (loanId) => {
        try {
            await axios.post(
                'http://localhost:5000/api/loans/approve',
                {loanId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token for secured routes
                    },
                }
            );
            toast.success('Loan approved successfully');
            // Update the loan status in the local state
            setLoans((prev) =>
                prev.map((loan) =>
                    loan._id === loanId ? {...loan, status: 'Approved'} : loan
                )
            );
        } catch (error) {
            console.error('Error approving loan:', error);
            toast.error(
                error.response?.data?.error || 'Error approving loan. Please try again.'
            );
        }
    };

    // Handle loan return verification
    const handleVerifyReturn = async (loanId) => {
        try {
            await axios.post(
                'http://localhost:5000/api/loans/verify-return',
                {loanId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token for secured routes
                    },
                }
            );
            toast.success('Book return verified successfully');
            // Update the verification status in the local state
            setLoans((prev) =>
                prev.map((loan) =>
                    loan._id === loanId
                        ? {...loan, verification: 'Verified', status: 'Returned'}
                        : loan
                )
            );
        } catch (error) {
            console.error('Error verifying return:', error);
            toast.error(
                error.response?.data?.error || 'Error verifying return. Please try again.'
            );
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Manage Loans</h1>
            {loans && loans.length > 0 ? (
                loans.map((loan) => (
                    <div key={loan._id} className="bg-white shadow rounded p-4 mb-4">
                        <h2 className="text-lg font-bold">
                            {loan.book?.title || 'Book data missing'}
                        </h2>
                        <p>Borrower: {loan.borrower?.name || 'Borrower data missing'}</p>
                        <p>Status: {loan.status}</p>
                        <p>Verification: {loan.verification || 'Pending'}</p>
                        {loan.status === 'Pending' && (
                            <button
                                onClick={() => handleApproveLoan(loan._id)}
                                className="bg-green-500 text-white p-2 rounded mt-2"
                            >
                                Approve Loan
                            </button>
                        )}
                        {loan.status === 'Returned' && loan.verification === 'Pending' && (
                            <button
                                onClick={() => handleVerifyReturn(loan._id)}
                                className="bg-blue-500 text-white p-2 rounded mt-2"
                            >
                                Verify Return
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p>No loans found</p>
            )}
        </div>
    );
}

export default ManageLoansPage;
