// name
// email
// phoneNumber *
// message
// for talk (bool update and delete by admin private) admin only
// isActive

// Get and post public api

// callBackRequestModel.js

const { Schema, model } = require("mongoose");

// Define the callBackRequest schema
const callBackRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  haveTalk: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field before each save
callBackRequestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema and export it
const CallBackRequest = model("CallBackRequest", callBackRequestSchema);

module.exports = CallBackRequest;
