const express = require('express');
const { signup, login, forgotPassword, resetPassword, updateEmail, sendOTP } = require('../controllers/auth');
const authMiddileware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/send-otp', authMiddileware, sendOTP);
router.post('/updateEmail', authMiddileware, updateEmail);

module.exports = router;
