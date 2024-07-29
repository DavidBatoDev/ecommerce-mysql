import { query } from '../services/dbService.js';

export const getProducts = async (req, res, next) => {
    try {
        const results = await query('SELECT * FROM products');
        res.status(200).json(results);
    } catch (err) {
        next(err);
    }
};
