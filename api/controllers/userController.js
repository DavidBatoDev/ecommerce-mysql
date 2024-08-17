import { query } from '../services/dbService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// for getting the user details
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

// for creating a new user
export const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if the required information is provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required information' });
        }

        // Validate email
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Check if the user already exists
        const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        const results = await query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        // create a cart for the user
        await query('INSERT INTO carts (user_id) VALUES (?)', [results.insertId]);

        // Return the user id
        return res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    } catch (err) {
        console.log('Error creating user:', err); // Log error for debugging
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        // Get the email and password from the request body
        const { email, password } = req.body;

        // Check if the required information is provided
        const results = await query('SELECT * FROM users WHERE email = ?', [email]);

        // Check if the user does not exists
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is not valid, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Get all the cart items and its quantity from cart items many to many table from the user id and cart id also get the product details from products table
        const cartItems = await query(
            `SELECT 
                cart_items.cart_id AS cart_id, 
                cart_items.product_id AS product_id, 
                cart_items.quantity AS quantity, 
                products.name AS product_name, 
                products.image AS product_image,
                products.description AS product_description,
                products.price AS product_price
            FROM cart_items 
            JOIN products ON cart_items.product_id = products.id 
            WHERE cart_items.cart_id = (SELECT cart_id FROM carts WHERE user_id = ?)`
            , [user.id]
        )

        return res.status(200).json({
             user: { id: user.user_id, email: user.email }, 
             cart: cartItems, 
             token 
        });
    } catch (err) {
        console.log('Error logging in user:', err); // Log error for debugging
        next(err);
    }
};
