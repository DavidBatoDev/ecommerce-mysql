import express from 'express'
import mysql from 'mysql2'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

// constants
const app = express()

const db = mysql.createConnection({
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    connectionLimit: 10
})

// middlewares
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    } else {
        console.log('Successfully connected to the database.');
    }
});

app.use(express.json())


// listen
app.listen(5000, () => {
    console.log('Server is running on port 5000')
})

// routes 
app.use

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).send({
        success: false,
        message,
        statusCode: statusCode
    })
})