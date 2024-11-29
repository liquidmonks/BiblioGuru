import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Placeholder admin credentials (this should be stored securely in production)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('password123', 10); // Hashing the password

// Admin login
export const adminLogin = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (username !== ADMIN_USERNAME) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // Generate a JWT token
        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.json({token});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({error: 'Server error'});
    }
};
