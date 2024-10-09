//routes/appointment.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addAppointment, getAppointmentById, getAllAppointment, updateAppointmentById, deleteAppointmentById } = require('../controllers/appointment');
const { upload } = require('../services/upload');

// Create a new appointment
router.post('/', authMiddleware, addAppointment);

// Get an appointment by ID
router.get('/:id', authMiddleware, getAppointmentById);

// Get all appointments
router.get('/', getAllAppointment);

  // Update an appointment by ID
router.patch('/:id', upload.single('file'), updateAppointmentById); // 'file' is the name of the field in the form

  // Delete an appointment by ID
router.delete('/:id', authMiddleware, deleteAppointmentById);

module.exports = router;