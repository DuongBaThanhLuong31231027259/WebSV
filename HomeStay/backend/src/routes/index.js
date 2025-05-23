const express = require('express');
const router = express.Router();

// Import your controllers here
// const userController = require('../controllers/userController');

// Define your routes
router.get('/users', (req, res) => {
    // Call the userController to get users
    // userController.getUsers(req, res);
    res.send('Get all users');
});

router.post('/users', (req, res) => {
    // Call the userController to create a new user
    // userController.createUser(req, res);
    res.send('Create a new user');
});

// Add more routes as needed

module.exports = router;