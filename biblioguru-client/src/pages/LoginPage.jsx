import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="p-6 bg-white rounded shadow-md w-80" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-bold mb-1">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-bold mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button className="w-full p-2 bg-blue-500 text-white rounded" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
