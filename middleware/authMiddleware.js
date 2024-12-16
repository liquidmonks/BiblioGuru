import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request object
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error('Not authorized, token failed');
            res.status(401).json({error: 'Not authorized, token failed'});
        }
    } else {
        res.status(401).json({error: 'Not authorized, no token'});
    }
};

// Middleware to restrict to admin only
export const adminOnly = (req, res, next) => {
    if (req.user?.role === 'admin') {
        next();
    } else {
        res.status(403).json({error: 'Not authorized as admin'});
    }
};
