const mongoose = require("mongoose");

let PointSchemas = mongoose.Schema({
  pointsToPrice: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },

  days: {
    type: Number,
    required: false,
  },
});

module.exports = PointSchemas = mongoose.model("points", PointSchemas);
