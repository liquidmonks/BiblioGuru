import {useEffect, useState} from 'react';
import axios from 'axios';

function ManageBorrowersPage() {
    const [borrowers, setBorrowers] = useState([]);

    useEffect(() => {
        fetchBorrowers();
    }, []);

    const fetchBorrowers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/borrowers');
            setBorrowers(response.data);
        } catch (error) {
            console.error('Error fetching borrowers:', error);
        }
    };

    const handleDeleteBorrower = async (borrowerId) => {
        try {
            await axios.delete(`http://localhost:5000/api/borrowers/${borrowerId}`);
            fetchBorrowers();
        } catch (error) {
            console.error('Error deleting borrower:', error);
        }
    };

    return (
        <div>
            <h2>Manage Borrowers</h2>
            {borrowers.map((borrower) => (
                <div key={borrower._id}>
                    <h3>{borrower.name}</h3>
                    <button onClick={() => handleDeleteBorrower(borrower._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ManageBorrowersPage;
