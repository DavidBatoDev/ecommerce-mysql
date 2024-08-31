// routes/ordersRoutes.js
import express from 'express';
import { placeOrder, getOrderDetails } from '../controllers/ordersController.js';
import { authorizationHandler } from '../middlewares/authorizationHandler.js';

const router = express.Router();

// Route to place an order
router.post('/place', authorizationHandler, placeOrder);

// Route to get details of an order
router.get('/:orderId', authorizationHandler, getOrderDetails);

export default router;
