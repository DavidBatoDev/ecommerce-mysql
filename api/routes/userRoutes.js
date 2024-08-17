import express from 'express';
import {
    getUser,
    createUser,
    loginUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUser);

router.post('/register', createUser);

router.post('/login', loginUser);

export default router;