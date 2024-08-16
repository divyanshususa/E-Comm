const mongoose = require("mongoose");

let ContactSchemas = mongoose.Schema({
  customerId: {
    type: String,
    required: false,
  },
  customerName: {
    type: String,
    required: false,
  },
  timestamp: {
    type: String,
    required: false,
  },

  customerEmail: {
    type: String,
    required: false,
  },
  customerAddress: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  lastActionDate: {
    type: String,
    required: false,
  },
  currentStatus: {
    type: String,
    required: false,
  },
});

module.exports = ContactSchemas = mongoose.model("contactus", ContactSchemas);
