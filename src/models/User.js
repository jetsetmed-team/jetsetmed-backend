// User model

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLenth: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLenth: 2,
        maxLength: 50
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
    password: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: null
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    otp: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isQNACompleted: { // login not require
        type: Boolean,
        default: false,
    },
    isConsultantFinish: { // first login then qna
        type: Boolean,
        default: false,
    },
    isSubscriptionTaken: { // first login, qna completed, isconsultant take
        type: Boolean,
        default: false,
    },
    previousAppointments: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Appointment'
        }
    ],
    upcomingAppointments: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Appointment'
        }
    ],
    role: {
        type: String,
        enum: ['admin', 'user', 'consultant'],
        required: true
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
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

module.exports = model('User', userSchema);