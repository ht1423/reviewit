import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth-token'];

    try {
        if (!token) {
            return res.status(401).json({
                msg: 'unauthorized. Token not found',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.user || !decoded.user.userId) {
            return res.status(403).json({
                msg: 'unauthorized. invalid token',
            });
        }

        req.user = decoded.user;

        next();
    } catch (err) {
        console.error('auth middleware error', err);

        return res.status(500).json({
            msg: 'Server error',
        });
    }
};

export default authMiddleware;
