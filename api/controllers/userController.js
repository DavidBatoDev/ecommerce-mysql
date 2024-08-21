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
                cart_items.product_id AS id, 
                cart_items.quantity AS quantity, 
                products.name AS name, 
                products.image AS image,
                products.description AS description,
                products.price AS price
            FROM cart_items 
            JOIN products ON cart_items.product_id = products.id 
            WHERE cart_items.cart_id = (SELECT id FROM carts WHERE user_id = ?)`
            , [user.id]
        )

        return res.status(200).json({
             user: { id: user.id, email: user.email }, 
             cart: cartItems, 
             token 
        });
    } catch (err) {
        console.log('Error logging in user:', err); // Log error for debugging
        next(err);
    }
};

// unused
export const addManyItemsToCart = async (req, res, next) => {
    try {
        const { products, userId } = req.body;

        // Check if the required information is provided
        if (!products || !userId) {
            return res.status(400).json({ message: 'Missing required information' });
        }

        // Add the products to the cart
        for (let i = 0; i < products.length; i++) {
            // Check if the product already exists in the cart
            const existingProduct = await query(
                `SELECT 
                    * 
                FROM cart_items 
                WHERE product_id = ? AND cart_id = (SELECT cart_id FROM carts WHERE user_id = ?)`, [products[i].id, userId]);

            // If the product exists, update the quantity
            if (existingProduct.length > 0) {
                await query(`
                    UPDATE 
                        cart_items SET quantity = quantity + ? 
                    WHERE product_id = ? AND cart_id = (SELECT cart_id FROM carts WHERE user_id = ?)`, [products[i].quantity, products[i].id, userId]);
            }
            // If the product does not exist, add the product to the cart 
            else {
                await query(`INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ((SELECT cart_id FROM carts WHERE user_id = ?), ?, ?)`, [userId, products[i].id, products[i].quantity]);
            }
        }

        return res.status(201).json({ message: 'Products added to cart successfully' });
    } catch (err) {
        console.log('Error adding products to cart:', err); // Log error for debugging
        next(err);
    }
}