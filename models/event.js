const mongoose = require('mongoose');

// const EventSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   date: { type: Date, required: true },
//   location: { type: String, required: true },
//   description: { type: String, required: true },
//   documentUrl: { type: String },
//   ticketInfo: [{
//     ticketRange: String,
//     price: Number,
//     discount: Number
//   }],
//   faqFields: [{
//     question: String,
//     answer: String
//   }],
//   websiteInfo: {
//     pageTitle: String,
//     contactInfo: {
//       email: String,
//       phone: String
//     }
//   }
// });


const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    documentUrl: { type: String },
    ticketInfo: [{
      ticketRange: String,
      price: Number,
      discount: Number
    }],
    faqFields: [{
      question: String,
      answer: String
    }],
    websiteInfo: {
      pageTitle: String,
      contactInfo: {
        email: String,
        phone: String
      }
    },
    status: { type: String, enum: ['active', 'pending', 'cancelled'], default: 'pending' }
  });
  

module.exports = mongoose.model('Event', EventSchema);