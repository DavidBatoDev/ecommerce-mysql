import { query } from "../services/dbService.js";

// Get all cart items
export const getCart = async (req, res, next) => {
    try {
        const results = await query('SELECT * FROM cart_items');
        return res.status(200).json(results);
    } catch (err) {
        next(err);
    }
};

// add a product to the cart
export const addToCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        // Check if the required information is provided
        if (!productId || !userId) {
            return res.status(400).json({ message: 'Missing required information' });
        }

        // Check if the product already exists in the cart
        const existingProduct = await query(
            `SELECT 
                * 
            FROM cart_items 
            WHERE product_id = ? AND cart_id = (SELECT id FROM carts WHERE user_id = ?)`, [productId, userId]
        );
        if (existingProduct.length > 0) {
            // Update the quantity of the product if it exists
            await query(`
                UPDATE 
                    cart_items SET quantity = quantity + ?
                WHERE product_id = ? AND cart_id = (SELECT id FROM carts WHERE user_id = ?)`, [quantity, productId, userId]
            );
        } else {
            // Add the product to the cart if it does not exist
            await query(`INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ((SELECT id FROM carts WHERE user_id = ?), ?, ?)`, [userId, productId, quantity]);
        }

        return res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (err) {
        console.log('Error adding product to cart:', err); // Log error for debugging
        next(err);
    }
}

// remove a product from the cart
export const removeFromCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        // Check if the required information is provided
        if (!productId || !userId) {
            return res.status(400).json({ message: 'Missing required information' });
        }

        // Check if the product exists in the cart
        const existingProduct = await query(
            `SELECT 
                * 
            FROM cart_items 
            WHERE product_id = ? AND cart_id = (SELECT id FROM carts WHERE user_id = ?)`, [productId, userId]
        );
        if (existingProduct.length > 0) {
            // Remove the product from the cart if it exists
            await query(`
                DELETE FROM 
                    cart_items 
                WHERE product_id = ? AND cart_id = (SELECT id FROM carts WHERE user_id = ?)`, [productId, userId]
            );
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        return res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (err) {
        console.log('Error removing product from cart:', err); // Log error for debugging
        next(err);
    }
}

