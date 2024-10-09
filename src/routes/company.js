//routes/companyStudent.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addCompany, getCompanyById, getAllCompany, updateCompanyById, deleteCompanyById } = require('../controllers/company');

// Create a new companyStudent
router.post('/', authMiddleware, addCompany);

// Get an companyStudent by ID
router.get('/:id', authMiddleware, getCompanyById);

// Get all companyStudents
router.get('/', authMiddleware,  getAllCompany);

  // Update an companyStudent by ID
router.patch('/:id', authMiddleware, updateCompanyById);

  // Delete an companyStudent by ID
router.delete('/:id', authMiddleware, deleteCompanyById);

module.exports = router;