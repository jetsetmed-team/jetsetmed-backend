// server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const qnaRoutes = require('./src/routes/qna');

const app = express();
// Define Port
const PORT = process.env.PORT || 5000;

// Init  Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Set static folder for serving uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
//Check 
app.get('/', (req, res) => res.send('Jet-Set-Med Server Running'));
// Authentication endpoint
app.use('/api/v1/auth', require('./src/routes/auth'));
// User endpoint
app.use('/api/v1/user', require('./src/routes/user'));
// Doctor endpoint
app.use('/api/v1/doctors', require('./src/routes/doctor'));
// Service endpoint
app.use('/api/v1/services', require('./src/routes/service'));
// Appointment endpoint
app.use('/api/v1/appointments', require('./src/routes/appointment'));
// Payment endpoint
app.use('/api/v1/payments', require('./src/routes/payment'));
// Medical Report endpoint
app.use('/api/v1/medicalReports', require('./src/routes/medicalReport'));
// CallBackRequest endpoint
app.use('/api/v1/callBackRequests', require('./src/routes/callBackRequest'));
// QNA endpoint
app.use('/api/v1/qnas', qnaRoutes);
// Company endpoint
app.use('/api/v1/company', require('./src/routes/company'));
// RegisterStudent endpoint
app.use('/api/v1/registerStudents', require('./src/routes/registerStudent'));


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
