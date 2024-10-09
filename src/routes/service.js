//routes/service.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addService, getServiceById, getAllServices, updateServiceById, deleteServiceById } = require('../controllers/service');

// Add new service
router.post('/', authMiddleware, addService);

// Get doctor by id service
router.get('/:id', authMiddleware, getServiceById);

// Get all services
router.get('/', getAllServices);

// Update service by id
router.patch('/:id', authMiddleware, updateServiceById);

// Delete service by id
router.delete('/:id', authMiddleware, deleteServiceById);


// soft delete by user and admin
module.exports = router;