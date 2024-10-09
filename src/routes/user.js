const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { updateUser, deleteUser, getUser } = require('../controllers/user');

// Get user profile
router.get('/', authMiddleware, getUser);

// Edit user profile
router.put('/', authMiddleware, updateUser);

// Delete user
router.delete('/', authMiddleware, deleteUser);


// soft delete by user and admin
module.exports = router;