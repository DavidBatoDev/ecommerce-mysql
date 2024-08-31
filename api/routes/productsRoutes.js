import express from 'express';
import {
    getProduct,
    getProducts,
    getAllCategories
} from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/product/:id', getProduct);

router.get('/categories', getAllCategories);

export default router;
