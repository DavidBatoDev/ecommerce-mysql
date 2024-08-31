import { query } from '../services/dbService.js';

// for getting all products
export const getProducts = async (req, res, next) => {
    try {
        const { category } = req.query;
        let sql = 'SELECT * FROM products';
        let params = [];

        if (category) {
            sql += ' WHERE category = ?';
            params = [category];
        }

        const results = await query(sql, params);
        return res.status(200).json(results);
    } catch (err) {
        next(err);
    }
};

// for getting all categories of products
export const getAllCategories = async (req, res, next) => {
    try {
        const results = await query('SELECT DISTINCT category FROM products');

        if (results.length == 0) {
            return res.status(404).json({ message: 'No categories found' });
        }

        const categoriesList = results.map((result) => result.category);
        
        return res.status(200).json(categoriesList);
    } catch (err) {
        next(err);
    }
}

// for getting a single product
export const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await query('SELECT * FROM products WHERE id = ?', [id]);

        if (results.length == 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(results[0]);
    } catch (err) {
        next(err);
    }
}