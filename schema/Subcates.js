const mongoose = require("mongoose");

let SubSchemas = mongoose.Schema({
  cid: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
});

module.exports = SubSchemas = mongoose.model("subcates", SubSchemas);
