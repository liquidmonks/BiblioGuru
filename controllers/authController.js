const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin login
exports.adminLogin = async (req, res) => {
    try {
        const {username, password} = req.body;

        // Validate credentials (for example purposes, let's use hardcoded values)
        if (username === 'admin' && password === 'password123') {
            // Generate a JWT token
            const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1h'});
            return res.json({token});
        }

        return res.status(401).json({error: 'Invalid credentials'});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({error: 'Server error'});
    }
};
