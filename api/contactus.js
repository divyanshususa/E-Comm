const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const ContactSchemas = require("../schema/Contactus");

router.get("/get", async (req, res) => {
  try {
    let policies = await ContactSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post(
  "/add",

  async (req, res) => {
    try {
      let holiday = new ContactSchemas(req.body);
      await holiday.save();
      res.json(holiday);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  }
);

router.post("/remove", async (req, res) => {
  try {
    let employer = await ContactSchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Leave not found");
    }
    await ContactSchemas.deleteOne({ _id: req.body.id });
    return res.status(200).json("Leave Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await ContactSchemas.findById(id);
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

router.get("/details", (req, res, next) => {
  const { id } = req.query;
  ContactSchemas.find({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

module.exports = router;
