import {Link, useNavigate} from 'react-router-dom';
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
        <div
            className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 flex flex-col items-center">
            <div
                className="bg-white rounded-lg shadow-xl w-full md:w-3/4 lg:w-1/2 p-8 transform transition hover:-translate-y-2 hover:shadow-2xl">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
                    Admin Dashboard
                </h1>
                <p className="text-lg text-gray-600 mb-8 text-center">
                    Welcome to the BiblioGuru admin dashboard. Here you can manage books, borrowers, and loans.
                </p>

                {/* Navigation Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Link
                        to="/manage-books"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-xl hover:bg-blue-700 transform transition duration-300 flex items-center justify-center"
                    >
                        📚 Manage Books
                    </Link>
                    <Link
                        to="/manage-borrowers"
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-xl hover:bg-green-700 transform transition duration-300 flex items-center justify-center"
                    >
                        👥 Manage Borrowers
                    </Link>
                    <Link
                        to="/manage-loans"
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-xl hover:bg-yellow-700 transform transition duration-300 flex items-center justify-center"
                    >
                        🔄 Manage Loans
                    </Link>
                    <Link
                        to="/reports"
                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-xl hover:bg-purple-700 transform transition duration-300 flex items-center justify-center"
                    >
                        📊 Generate Reports
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
