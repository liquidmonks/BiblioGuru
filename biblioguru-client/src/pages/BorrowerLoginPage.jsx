import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function BorrowerLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/borrowers/login', {email, password});
            localStorage.setItem('token', response.data.token);
            navigate('/borrower-dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to log in. Please check your credentials and try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-200 p-8 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Borrower Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BorrowerLoginPage;
