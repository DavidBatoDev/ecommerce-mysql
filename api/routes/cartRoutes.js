import express from 'express';
import {
    getCart,
    addToCart,
    removeFromCart
} from '../controllers/cartController.js';
import { authorizationHandler } from '../middlewares/authorizationHandler.js';

const router = express.Router();

router.get('/', getCart);

router.post('/add', authorizationHandler, addToCart);

router.post('/remove', authorizationHandler, removeFromCart);

export default router;