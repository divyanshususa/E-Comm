const mongoose = require("mongoose");

let BannerSchemas = mongoose.Schema({
  adlink: {
    type: String,
    required: false,
  },
  addes: {
    type: String,
    required: false,
  },
  tittle: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
});

module.exports = BannerSchemas = mongoose.model("banners", BannerSchemas);
