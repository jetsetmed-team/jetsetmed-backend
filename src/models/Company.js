// company name
// email verifyed
// phonenumber
// user id default null
// status ['approved', 'pendding']
// isactive
// registerStudent : ref: [Register student by consultant] befault: []
// subscribedStudent: ref: [Register student by consultant] befault: []

// post public
// get by id private consultant, admin
// get all admin
// put consultant, admin
// delete isactive consultant soft
// delete admin

// Company model

const { Schema, model } = require("mongoose");

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLenth: 2,
    maxLength: 50,
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  status: {
    type: String,
    enum: ["approved", "pending"],
    default: "pending",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  registeredStudents: [
    {
      type: Schema.Types.ObjectId,
      ref: "RegisterStudent",
      befault: null,
    },
  ],
  subscribedStudents: [
    {
      type: Schema.Types.ObjectId,
      ref: "RegisterStudent",
      befault: null,
    },
  ],
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
companySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = model("Company", companySchema);
