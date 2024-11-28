const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Example route for admin login
router.post('/login', authController.adminLogin);

module.exports = router;
