const mongoose = require("mongoose");

let UserSchemas = mongoose.Schema({
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
  coupon: {
    type: String,
    required: false,
  },
  address: [],
  profilelink: {
    type: String,
    required: false,
  },
  active: {
    type: String,
    required: false,
  },
  expdate: {
    type: String,
    required: false,
  },
  currentaddress: {},
  cart: [],
  wishlist: [],
});

module.exports = UserSchemas = mongoose.model("users", UserSchemas);
