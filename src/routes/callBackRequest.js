//routes/callBackRequest.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addCallBackRequest, getCallBackRequestById, getAllCallBackRequest, updateCallBackRequestById, deleteCallBackRequestById } = require('../controllers/callBackRequest');

// Create a new callBackRequest
router.post('/', addCallBackRequest);

// Get an callBackRequest by ID
router.get('/:id', getCallBackRequestById);

// Get all callBackRequests
router.get('/', getAllCallBackRequest);

  // Update an callBackRequest by ID
router.patch('/:id', authMiddleware, updateCallBackRequestById);

  // Delete an callBackRequest by ID
router.delete('/:id', authMiddleware, deleteCallBackRequestById);

module.exports = router;