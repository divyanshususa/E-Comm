const mongoose = require("mongoose");

let CartSchemas = mongoose.Schema({
  pid: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  cid: {
    type: String,
    required: false,
  },
});

module.exports = CartSchemas = mongoose.model("carts", CartSchemas);
