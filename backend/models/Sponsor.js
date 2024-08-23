const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  package: {
    type: String,
    required: true,
    enum: ['Gold', 'Silver', 'Bronze']
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Active', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sponsor', sponsorSchema);