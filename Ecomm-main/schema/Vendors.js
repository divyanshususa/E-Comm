const mongoose = require("mongoose");

let VendorSchemas = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },

  balance: {
    type: Number,
    required: false,
  },
  refercode: {
    type: String,
    required: false,
  },
  address: [],
  profilelink: {
    type: String,
    required: false,
  },
  panno: {
    type: String,
    required: false,
  },
  regno: {
    type: String,
    required: false,
  },
  adharno: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
});

module.exports = VendorSchemas = mongoose.model("vendors", VendorSchemas);
