import express from 'express';
import { createUser } from '../controllers/userController.js';
import validateUser from '../middlewares/validationMiddleware.js';

const router = express.Router();
router.post('/createUser', validateUser, createUser);

export default router;