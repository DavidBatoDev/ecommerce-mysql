import express from 'express';
import { 
    getProducts,
    getAllCategories
} from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/categories', getAllCategories);

export default router;
