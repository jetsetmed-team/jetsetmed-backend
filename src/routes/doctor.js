//routes/doctor.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addDoctor, getDoctorById, getAllDoctors, updateDoctorById, deleteDoctorById } = require('../controllers/doctor');

// Add new doctor
router.post('/', authMiddleware, addDoctor);

// Get doctor by id doctor
router.get('/:id', authMiddleware, getDoctorById);

// Get all doctors
router.get('/', getAllDoctors);

// Update doctor by id
router.patch('/:id', authMiddleware, updateDoctorById);

// Delete doctor by id
router.delete('/:id', authMiddleware, deleteDoctorById);


// soft delete by user and admin
module.exports = router;