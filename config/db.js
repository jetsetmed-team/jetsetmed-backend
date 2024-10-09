const mongoose = require('mongoose');
const { mongoURL } = require('../constants')

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
