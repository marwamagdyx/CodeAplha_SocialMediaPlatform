const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your JWT secret set in your environment
        req.user = decoded;  // Attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
module.exports = auth;