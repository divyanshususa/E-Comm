const mongoose = require("mongoose");

let CategorySchemas = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  subcategories: [],
});

module.exports = CategorySchemas = mongoose.model(
  "categories",
  CategorySchemas
);
