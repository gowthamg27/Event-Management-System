const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Sponsor name is required"],
    trim: true,
    maxlength: [100, "Sponsor name cannot be more than 100 characters"],
  },
 
  category: {
    type: String,
    required: [true, "Sponsor category is required"],
    enum: {
      values: ["Platinum", "Gold", "Silver", "Bronze"],
      message: "{VALUE} is not a valid sponsor category",
    },
  },
  contact: {
    name: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Contact email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  package: {
    type: String,
    required: [true, "Sponsor package is required"],
    trim: true,
  },
  eventName: {
    type: String,
    required: [true, "Event name is required"],
    trim: true,
    maxlength: [100, "Event name cannot be more than 100 characters"],
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["Pending", "Active", "Rejected"],
      message: "{VALUE} is not a valid sponsor status",
    },
    default: "Pending",
  },
  rejectionReason: {
    type: String,
    trim: true,
    default: null, // Rejection reason is only filled when status is 'Rejected'
    maxlength: [500, "Rejection reason cannot be more than 500 characters"],
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

// Middleware to update the updatedAt field
sponsorSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

module.exports = Sponsor;
