app.get('/admin/dashboard', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
});

app.get('/user/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to User Profile', user: req.user });
});
