import { query } from '../services/dbService.js';

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
