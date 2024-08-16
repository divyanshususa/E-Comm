const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const PointSchemas = require("../schema/Points");

router.get("/get", async (req, res) => {
  try {
    let policies = await PointSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post(
  "/add",

  async (req, res) => {
    try {
      let holiday = new PointSchemas({
        pointsToPrice: req.body.pointsToPrice,
        name: req.body.name,
      });
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
    let employer = await PointSchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Leave not found");
    }
    await PointSchemas.deleteOne({ _id: req.body.id });
    return res.status(200).json("Leave Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await PointSchemas.findById(id);
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
