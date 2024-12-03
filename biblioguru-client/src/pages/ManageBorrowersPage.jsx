import {useEffect, useState} from 'react';
import axios from 'axios';

function ManageBorrowersPage() {
    const [borrowers, setBorrowers] = useState([]);
    const [editBorrower, setEditBorrower] = useState(null);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

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

    const handleEdit = (borrower) => {
        setEditBorrower(borrower);
        setNewName(borrower.name);
        setNewEmail(borrower.email);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/borrowers/${editBorrower._id}`, {
                name: newName,
                email: newEmail,
                password: newPassword,
            });
            setEditBorrower(null);
            window.location.reload(); // Refresh the list after updating
        } catch (error) {
            console.error('Error updating borrower:', error);
        }
    };

    const handleDelete = async (borrowerId) => {
        try {
            await axios.delete(`http://localhost:5000/api/borrowers/${borrowerId}`);
            setBorrowers(borrowers.filter((borrower) => borrower._id !== borrowerId));
        } catch (error) {
            console.error('Error deleting borrower:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-200 to-blue-200 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Manage Borrowers</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {borrowers.map((borrower) => (
                        <div key={borrower._id}
                             className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-md">
                            <div>
                                <p className="text-lg font-semibold">{borrower.name}</p>
                                <p className="text-sm text-gray-600">{borrower.email}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleEdit(borrower)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(borrower._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {editBorrower && (
                    <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Edit Borrower</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">New Password (optional)</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Update Borrower
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageBorrowersPage;
