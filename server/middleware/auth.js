const auth = (req, res, next) => {
    // For now, we simulate auth by checking a header
    // In a full implementation, you would verify a JWT token here
    const adminKey = req.headers['x-admin-key'];
    
    if (adminKey && adminKey === process.env.ADMIN_KEY) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized. Admin access required.' });
    }
};

module.exports = auth;
