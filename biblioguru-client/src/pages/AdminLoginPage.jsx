import React, {useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/admin-login', {
                username,
                password,
            });
            console.log('Admin login successful:', response.data); // Log the response
            localStorage.setItem('token', response.data.token);
            toast.success('Login successful');
        } catch (error) {
            console.error('Error logging in:', error.response || error); // Log detailed error
            toast.error(error.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default AdminLoginPage;
