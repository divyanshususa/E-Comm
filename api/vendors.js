const express = require("express");
const router = express.Router();
const Str = require("@supercharge/strings");
const { check, validationResult } = require("express-validator");
const VendorSchemas = require("../schema/Vendors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

const secretkey = "qwertyuiopasdfghjklzxcvbnmlkjhgf";

router.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      let { email, password } = req.body;
      console.log(req.body);
      const errors = validationResult(req);
      let employer = await VendorSchemas.findOne({ email });
      console.log(employer);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array });
      }
      if (!employer) {
        return res.status(401).json("Not Found");
      }

      const passwordMatch = await bcrypt.compare(password, employer.password);
      if (passwordMatch) {
        if (employer.active == true) {
          const token = jwt.sign({ employer: { id: employer.id } }, secretkey, {
            expiresIn: "24h",
          });

          res.status(200).json({ token, employer });
          // const payload = {
          //     employer : {
          //         id : employer.id
          //     }
          //  }
          //  res.status(200).json(employer);
        } else {
          res.status(401).json("Vendor not Active");
        }
      } else {
        res.status(401).json("password dont match");
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error....." });
    }
  }
);

router.get("/details/:id", (req, res, next) => {
  console.log(req.params.id);
  VendorSchemas.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.get("/getEmployee", async (req, res) => {
  try {
    let policies = await VendorSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const referc = Str.random(5);
    let holiday = await VendorSchemas.findOne({ email: req.body.email });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    if (holiday) {
      return res.status(401).json({ msg: "Username already present" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    holiday = new VendorSchemas({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      active: false,
      regno: req.body.regno,
      adharno: req.body.adharno,
      panno: req.body.panno,
      state: req.body.state,
    });
    await holiday.save();
    res.status(200).json(holiday);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await VendorSchemas.findById(id);
    if (!employer) {
      return res.status(401).json("Employer not found");
    }
    // let obj = {
    //     allCoveringEmployees :
    // }
    Object.assign(employer, req.body);
    await employer.save();
    res.json(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
});
module.exports = router;
