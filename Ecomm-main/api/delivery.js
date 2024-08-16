const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const DelvySchemas = require("../schema/Delievery");

router.get("/details", (req, res, next) => {
  const { id } = req.query;
  DelvySchemas.find({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.get("/getlist", async (req, res) => {
  try {
    let policies = await DelvySchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    let holiday = new DelvySchemas({
      type: req.body.type,
      value: req.body.value,
    });
    await holiday.save();
    res.json(holiday);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/updatevalue", async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await DelvySchemas.findOne({ _id: id });
    if (!employer) {
      return res.status(401).json("Type not found");
    }
    var obj = {
      value: req.body.value,
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/delete", async (req, res) => {
  try {
    let employer = await DelvySchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Item not found");
    }
    await DelvySchemas.deleteOne({ _id: req.body.id });
    return res.status(200).json("Cart Item Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
