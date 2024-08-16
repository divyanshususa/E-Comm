const express = require("express");
const router = express.Router();
const Str = require("@supercharge/strings");
const { check, validationResult } = require("express-validator");
const AdminSchemas = require("../schema/Admin");
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
      let superAdmin = await AdminSchemas.findOne({ email });
      console.log(superAdmin);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array });
      }
      if (!superAdmin) {
        return res.status(401).json("Not Found");
      }

      const passwordMatch = await bcrypt.compare(password, superAdmin.password);

      if (true) {
        console.log("this is ....", superAdmin.id);

        const token = jwt.sign(
          { superAdmin: { id: superAdmin.id } },
          secretkey,
          { expiresIn: "24h" }
        );

        res.status(200).json({ token, superAdmin });
        // const payload = {
        //     superAdmin : {
        //         id : superAdmin.id
        //     }
        //  }
        //  res.status(200).json(superAdmin);
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
  AdminSchemas.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.get("/getadmins", async (req, res) => {
  try {
    let policies = await AdminSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const referc = Str.random(5);
    let holiday = await AdminSchemas.findOne({ email: req.body.email });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    if (holiday) {
      return res.status(401).json({ msg: "Username already present" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    holiday = new AdminSchemas({
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    });
    await holiday.save();
    res.status(200).json(holiday);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
