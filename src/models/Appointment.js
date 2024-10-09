// appointmentModel.js
// report upload by doctor -- pending
// post - user
// get id and get all user and admin
// put doctor only
// delete isActive by admin

// for appointment booking qna completed, isconstant require, issubscribe require

const { Schema, model } = require('mongoose');

// Define the appointment schema
const appointmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  reportFilePath: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field before each save
appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema and export it
const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;