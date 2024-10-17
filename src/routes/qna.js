//routes/qna.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addQNA, getQNAById, getAllQNA, updateQNAById, deleteQNAById } = require('../controllers/qna');

// Create a new qna (now requires authentication)
router.post('/', authMiddleware, addQNA);

// Get an qna by ID
router.get('/:id', authMiddleware, getQNAById);

// Get all qnas
router.get('/', authMiddleware, getAllQNA);

  // Update an qna by ID
router.patch('/:id', authMiddleware, updateQNAById);

  // Delete an qna by ID
router.delete('/:id', authMiddleware, deleteQNAById);

module.exports = router;
