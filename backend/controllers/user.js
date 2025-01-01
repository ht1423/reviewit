import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import { zodSignin, zodSignup } from '../zod.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const check = zodSignup.safeParse(req.body);

        if (!check.success) {
            return res.status(400).json({
                error: check.error.format(),
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                msg: 'User already exists. Please sign in',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const payload = {
            user: {
                userId: newUser._id,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.cookie('auth-token', token);

        return res.status(201).json({
            msg: 'Signup successful',
            newUser,
        });
    } catch (err) {
        console.error('Signup error', err);

        return res.status(500).json({
            msg: 'Server error. Please try again later',
        });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = zodSignin.safeParse(req.body);

        if (!check.success) {
            return res.status(400).json({
                error: check.error.format(),
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                msg: 'User does not exist. please Sign up',
            });
        }

        const match = await bcrypt.compare(password, existingUser.password);

        if (!match) {
            return res.status(401).json({
                msg: 'password is incorrect',
            });
        }

        const payload = {
            user: {
                userId: existingUser._id,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.cookie('auth-token', token);

        return res.json({
            msg: 'Signin successful',
            existingUser,
        });
    } catch (err) {
        console.error('Signin error', err);

        return res.status(500).json({
            msg: 'Server error. please try again later',
        });
    }
};

export { signin, signup };
