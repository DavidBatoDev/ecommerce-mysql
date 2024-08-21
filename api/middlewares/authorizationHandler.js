import jwt from 'jsonwebtoken';
import { query } from '../services/dbService.js';
import { errorHandler } from '../utils/errorHandler.js';

// Function to remove quotes from a token
const removeQuotes = (token) => {
    return token.replace(/^"|"$/g, '');
};

export const authorizationHandler = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        token = removeQuotes(token);  
        if (!token) {
            return next(errorHandler(401, 'Not authorized'));
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await query('SELECT * FROM users WHERE id = ?', [decodedToken.id]);
        if (user.length == 0) {
            return next(errorHandler(401, 'Not authorized'));
        }
        req.user = user[0];
        next();
    } catch (error) {
        console.log('Error:', error);
        next(error);
    }
}
