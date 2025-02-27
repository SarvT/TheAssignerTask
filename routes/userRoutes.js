import express from 'express';
import { createUser } from '../controllers/user.controller.js';
import validateUser from '../middlewares/validation.middleware.js';

const router = express.Router();
router.post('/createUser', validateUser, createUser);

export {router}