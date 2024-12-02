import axios from 'axios';
import {useState} from 'react';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/borrowers/register', {
                username,
                password,
            });

            if (response.status === 201) {
                alert('Registration successful, please log in.');
            } else {
                alert('Something went wrong, please try again.');
            }
        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed, please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-8">
            <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleRegister}>
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 p-2 border rounded-lg"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 border rounded-lg"
                    required
                />
                <button className="bg-blue-500 w-full text-white py-2 rounded-lg font-bold hover:bg-blue-600">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;
