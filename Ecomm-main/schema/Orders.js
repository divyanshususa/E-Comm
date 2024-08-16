const mongoose = require("mongoose");

let OrderSchemas = mongoose.Schema(
  {
    odate: {
      type: String,
      required: false,
    },
    edate: {
      type: String,
      required: false,
    },
    oprice: {
      type: String,
      required: false,
    },
    ono: {
      type: String,
      required: false,
    },
    oproduct: {
      type: String,
      required: false,
    },
    oaddress: {},
    ostatus: {
      type: String,
      required: false,
    },
    uid: {
      type: String,
      required: false,
    },
    vid: {
      type: String,
      required: false,
    },
    ocart: [],
    rpayid: {
      type: String,
      required: false,
    },
    vname: {
      type: String,
      required: false,
    },
    month: {
      type: Number,
      default: new Date().getMonth(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = OrderSchemas = mongoose.model("orders", OrderSchemas);
