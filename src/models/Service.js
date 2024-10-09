// serviceModel.js
// get is public and other are private admin can access only

const { Schema, model } = require('mongoose');

// Define the service schema
const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
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
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema and export it
const Service = model('Service', serviceSchema);

module.exports = Service;