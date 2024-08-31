import express from 'express';
import dotenv from 'dotenv';
import productsRoutes from './routes/productsRoutes.js';
import usersRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Constants
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).send({
        success: false,
        message,
        statusCode
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
});
