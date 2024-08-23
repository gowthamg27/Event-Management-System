  const mongoose = require('mongoose');

  const SpeakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    topic: { type: String, required: true },
    status: { type: String, default: 'Pending' },
  });

  module.exports = mongoose.model('Speaker', SpeakerSchema);