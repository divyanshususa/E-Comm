const mongoose = require("mongoose");

let AdminSchemas = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: true,
  },
});

module.exports = AdminSchemas = mongoose.model("admins", AdminSchemas);
