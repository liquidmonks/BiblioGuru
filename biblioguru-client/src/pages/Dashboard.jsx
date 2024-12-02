import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p>Welcome to the BiblioGuru admin dashboard.</p>
            {/* Placeholder for other components like book management and borrower management */}
        </div>
    );
}

export default Dashboard;
