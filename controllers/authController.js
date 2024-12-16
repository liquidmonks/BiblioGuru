import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Borrower from '../models/Borrower.js';

// Generate JWT Token
const generateToken = (id, role, expiresIn = '7d') => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn});
};

// Borrower/User Login
export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Find the user by email
        const user = await Borrower.findOne({email});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        // Generate JWT
        const token = generateToken(user._id, 'borrower', '7d');

        res.status(200).json({token});
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({error: 'Server error'});
    }
};

// Admin Login
export const adminLogin = async (req, res) => {
    const {username, password} = req.body;

    try {
        // Find the admin by username
        const admin = await Admin.findOne({username});
        if (!admin) {
            return res.status(404).json({error: 'Admin not found'});
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        // Generate JWT
        const token = generateToken(admin._id, 'admin', '7d');

        res.status(200).json({token});
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({error: 'Server error'});
    }
};

// Refresh Token Route
export const refreshToken = (req, res) => {
    try {
        const oldToken = req.headers.authorization?.split(' ')[1];
        if (!oldToken) {
            return res.status(401).json({error: 'No token provided'});
        }

        // Verify the existing token
        jwt.verify(oldToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({error: 'Invalid or expired token'});
            }

            // Generate a new token
            const newToken = generateToken(decoded.id, decoded.role, '7d');
            res.status(200).json({token: newToken});
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({error: 'Failed to refresh token'});
    }
};
