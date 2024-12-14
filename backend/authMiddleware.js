import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.cookies) {
            return res.status(401).json({
                msg: 'Unauthorized. No cookies found',
            });
        }

        const token = req.cookies['auth-token'];

        if (!token) {
            return res.status(401).json({
                msg: 'Unauthorized. Token not found',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.user || !decoded.user.userId) {
            return res.status(401).json({
                msg: 'Unauthorized. Invalid token',
            });
        }

        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Auth middleware error', err);

        return res.status(500).json({
            msg: 'Server error. please try again later',
        });
    }
};

export default authMiddleware;
