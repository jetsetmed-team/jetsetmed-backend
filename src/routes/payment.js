//routes/payment.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addPayment, getPaymentById, getAllPayments, updatePaymentById, deletePaymentById } = require('../controllers/payment');

// Create a new payment
router.post('/', authMiddleware, addPayment);

// Get an payment by ID
router.get('/:id', authMiddleware, getPaymentById);

// Get all payments
router.get('/', getAllPayments);

  // Update an payments by ID
router.patch('/:id', authMiddleware, updatePaymentById);

  // Delete an payment by ID
router.delete('/:id', authMiddleware, deletePaymentById);

module.exports = router;