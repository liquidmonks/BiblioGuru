import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function BorrowerLoginPage() {
    // State for email and password input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Function to handle the borrower login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Sending a POST request to the backend API to authenticate the borrower
            const response = await axios.post('http://localhost:5000/api/borrowers/login', {
                email,
                password,
            });
            // Save JWT token to localStorage and navigate to the borrower page
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Invalid credentials');
        }
    };

    // Rendering the login form
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-green-200 p-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Borrower Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-bold mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/register')}
                        className="text-blue-600 hover:underline cursor-pointer focus:outline-none"
                        aria-label="Register for an account"
                    >
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
}

export default BorrowerLoginPage;
