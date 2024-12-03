import React, {useEffect, useState} from 'react';
import axios from 'axios';

function ManageBorrowersPage() {
    const [borrowers, setBorrowers] = useState([]); // UseState for borrowers list
    const [editingBorrower, setEditingBorrower] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    // Fetching borrowers from the backend
    useEffect(() => {
        const fetchBorrowers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/borrowers');
                setBorrowers(response.data);
            } catch (error) {
                console.error('Error fetching borrowers:', error);
            }
        };
        fetchBorrowers();
    }, []);

    const handleEditClick = (borrower) => {
        setEditingBorrower(borrower);
        setNewPassword(''); // Clear the input for a new password
    };

    const handlePasswordChange = async () => {
        if (!editingBorrower) return;

        try {
            await axios.put(`http://localhost:5000/api/borrowers/${editingBorrower._id}`, {
                password: newPassword
            });
            alert('Password updated successfully');
            setEditingBorrower(null);
            // Refresh the borrowers list after update
            const response = await axios.get('http://localhost:5000/api/borrowers');
            setBorrowers(response.data);
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Failed to update password');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-100 to-purple-200 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Manage Borrowers</h1>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {borrowers.map((borrower) => (
                        <div key={borrower._id} className="bg-gray-100 p-4 rounded shadow-md">
                            <h2 className="text-xl font-bold">Borrower: {borrower.name}</h2>
                            <p>Email: {borrower.email}</p>
                            <button
                                onClick={() => handleEditClick(borrower)}
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                            >
                                Edit Borrower
                            </button>
                        </div>
                    ))}
                </div>

                {editingBorrower && (
                    <div className="mt-6 bg-gray-200 p-4 rounded">
                        <h3 className="text-2xl font-bold">Editing Borrower: {editingBorrower.name}</h3>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 mt-4 border rounded"
                        />
                        <button
                            onClick={handlePasswordChange}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                        >
                            Update Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageBorrowersPage;
