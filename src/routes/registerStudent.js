//routes/registerStudent.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addRegisterStudent, getAllRegisterStudent, getRegisterStudentById, updateRegisterStudentById, deleteRegisterStudentById } = require('../controllers/registerStudent');

// Create a new registerStudent
router.post('/', authMiddleware, addRegisterStudent);

// Get an registerStudent by ID
router.get('/:id', authMiddleware, getRegisterStudentById);

// Get all registerStudents
router.get('/', getAllRegisterStudent);

  // Update an registerStudent by ID
router.patch('/:id', authMiddleware, updateRegisterStudentById);

  // Delete an registerStudent by ID
router.delete('/:id', authMiddleware, deleteRegisterStudentById);

module.exports = router;