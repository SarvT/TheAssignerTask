import sanitizeInput from '../utils/sanitization.js';
  
export const createUser = (req, res) => {
    const sanitizedData = sanitizeInput(req.body);
    res.status(201).json({ message: 'User created successfully', data: sanitizedData });
};
