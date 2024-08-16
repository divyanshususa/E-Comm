const express_ = require("express");
const app = express_();
const morgan = require("morgan")
const bodyparser = require("body-parser");
const helmet = require("helmet");
var cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoose = require("mongoose");
// const uri = "mongodb+srv://biomass:biomass@cluster0.tz68s32.mongodb.net/biomass?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://susalabs:susalabs@cluster0.xn0yck9.mongodb.net/?retryWrites=true&w=majority";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectToDatabase();

app.use(cors()); //to follow cors policy
app.use(xss()); //safety against XSS attack or Cross Site Scripting attacks
app.use(helmet()); //safety against XSS attack
app.use(express_.json({ extended: false }));
app.use(express_.static("."));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//to log http request
app.use(morgan('dev'));

const port = process.env.PORT || 5000;

app.use("/api/orders", require("./api/orders"));
app.use("/api/users", require("./api/users"));
app.use("/api/products", require("./api/products"));
app.use("/api/vendors", require("./api/vendors"));
app.use("/api/images", require("./api/image"));
app.use("/api/category", require("./api/category"));
app.use("/api/cart", require("./api/cart"));
app.use("/api/wishlist", require("./api/wishlist"));
app.use("/api/upload", require("./api/upload"));
app.use("/api/delivery", require("./api/delivery"));
app.use("/api/points", require("./api/points"));
app.use("/image/", require("./api/redirect"));
app.use("/api/contactus", require("./api/contactus"));
app.use("/api/admins", require("./api/admins"));
app.use("/api/qr", require("./api/qrCode"));
app.use("/api/voucher", require("./api/voucher"));
app.use("/api/isp", require("./api/isp"));

app.get("/", (req, res) => {
  console.log("hello");
  res.json("working");
});

app.listen(port, () => console.log(`Server is up and running at ${port}`));
