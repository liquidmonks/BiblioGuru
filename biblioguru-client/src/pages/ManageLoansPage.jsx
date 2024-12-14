import React, {useEffect, useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function ManageLoansPage() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loans', {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                });
                console.log('Fetched loans:', response.data); // Debug the response
                setLoans(response.data);
            } catch (error) {
                console.error('Error fetching loans:', error);
                toast.error('Failed to fetch loans');
            }
        };
        fetchLoans();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">Manage Loans</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loans && loans.length > 0 ? (
                    loans.map((loan) => (
                        <div key={loan._id} className="bg-white shadow rounded p-4">
                            <h2 className="text-lg font-bold">
                                {loan.book?.name || 'Book data missing'}
                            </h2>
                            <p>Borrower: {loan.borrower?.name || 'Borrower data missing'}</p>
                            <p>Status: {loan.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No loans found</p>
                )}
            </div>
        </div>
    );
}

export default ManageLoansPage;
