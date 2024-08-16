const mongoose = require("mongoose");

let DelvySchemas = mongoose.Schema({
  type: {
    type: String,
    required: false,
  },
  value: {
    type: Number,
    required: false,
  },
});

module.exports = DelvySchemas = mongoose.model("deliveries", DelvySchemas);
