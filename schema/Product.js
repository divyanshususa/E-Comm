const mongoose = require("mongoose");

let ProductSchemas = mongoose.Schema({
  pname: {
    type: String,
    required: false,
  },
  pdes: {
    type: String,
    required: false,
  },
  aprice: {
    type: Number,
    required: false,
  },
  dprice: {
    type: Number,
    required: false,
  },
  pphoto: {
    type: String,
    required: false,
  },
  pcat: {
    type: String,
    required: false,
  },
  poffer: {
    type: String,
    required: false,
  },
  pictures: [],

  noofStock: {
    type: Number,
    required: false,
  },
  reviews: [],
  rating: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },

  psub: {
    type: String,
    required: false,
  },
  vid: {
    type: String,
    required: false,
  },
  vname: {
    type: String,
    required: false,
  },
  moi: {
    type: String,
    required: false,
  },
  dust: {
    type: String,
    required: false,
  },
  gcv: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
  },

  ratings: {
    type: [
      {
        userId: String, // User ID who gave the rating
        rating: Number, // Rating value (e.g., 1, 2, 3, 4, 5)
      },
    ],
    default: [],
  },
  geolocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
});

ProductSchemas.index({ geolocation: "2dsphere" });

module.exports = ProductSchemas = mongoose.model("products", ProductSchemas);
