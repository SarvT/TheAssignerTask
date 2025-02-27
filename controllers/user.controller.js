import User from '../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    const { name, balance } = req.body;

    if (!name || balance === undefined) {
      return res.status(400).json({ success: false, message: 'Name and balance are required' });
    }

    const user = new User({ name, balance });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};
