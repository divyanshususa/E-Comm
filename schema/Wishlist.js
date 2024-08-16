const mongoose = require("mongoose");

let WishSchemas = mongoose.Schema({
  pid: {
    type: String,
    required: false,
  },
  cid: {
    type: String,
    required: false,
  },
});

module.exports = WishSchemas = mongoose.model("wishlists", WishSchemas);
