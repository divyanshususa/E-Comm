// models/Voucher.js

const mongoose = require("mongoose");

let VoucherSchema = mongoose.Schema({
  discountPercentage: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  voucherDesc: {
    type: String,
    required: false,
  },
});

module.exports = VoucherSchema = mongoose.model("Voucher", VoucherSchema);
