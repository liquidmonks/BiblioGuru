import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Ensure this points to your backend server
});

export default api;
