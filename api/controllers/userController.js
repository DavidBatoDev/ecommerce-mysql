import { query } from '../services/dbService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await query('SELECT * FROM users WHERE id = ?', [id]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error fetching user:', err); // Log error for debugging
        next(err);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required information' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Check if the user already exists
        const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const results = await query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        console.log(results)

        return res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    } catch (err) {
        console.log('Error creating user:', err); // Log error for debugging
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const results = await query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(user.user_id)

        return res.status(200).json({ user: { id: user.user_id, email: user.email }, token });
    } catch (err) {
        console.log('Error logging in user:', err); // Log error for debugging
        next(err);
    }
};
