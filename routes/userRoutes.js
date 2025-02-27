
import express from 'express'

import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/admin/dashboard', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
});

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to User Profile', user: req.user });
});

export { router };