import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the admin is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirect to login if no token is found
        }
    }, [navigate]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p>Welcome to the BiblioGuru admin dashboard. Here you can manage books, borrowers, and loans.</p>

            {/* Placeholder for other components like book management and borrower management */}
            <div className="mt-6">
                <button
                    onClick={() => navigate('/manage-books')}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                >
                    Manage Books
                </button>
                <button
                    onClick={() => navigate('/manage-borrowers')}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Manage Borrowers
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
