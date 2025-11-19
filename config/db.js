const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/pokemon');
    console.log('Connected to MongoDB Pokemon database');
    } catch (err) {
    console.error('Error connecting to MongoDB Pokemon database:', err);
    }
};

module.exports = connectDB;