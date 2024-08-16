const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const CategorySchemas = require("../schema/Category");
const SubSchemas = require("../schema/Subcates");
const Str = require("@supercharge/strings");
const authenticate = require("../middleware/authenticate");

router.get("/getcategories", async (req, res) => {
  try {
    let policies = await CategorySchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post(
  "/addcategories",

  async (req, res) => {
    try {
      let holiday = new CategorySchemas({
        name: req.body.name,
        image: req.body.image,
      });
      await holiday.save();
      res.json(holiday);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  }
);

router.post("/addsubcategory", async (req, res) => {
  try {
    const referc = Str.random(5);
    let employer = await CategorySchemas.findOne({ _id: req.body.cid });

    if (!employer) {
      return res.status(401).json("Category not found");
    }
    employer.subcategories.push({
      sid: referc,
      name: req.body.name,
    });
    await employer.save();
    res.json(employer);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.get("/getsubcategory", async (req, res) => {
  try {
    let { cid } = req.query;

    let employer = await CategorySchemas.findOne({ _id: cid });

    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    return res.send(employer.subcategories);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post(
  "/deletecategory",

  async (req, res) => {
    try {
      console.log(req.body);
      let employer = await CategorySchemas.findOne({ _id: req.body.id });
      if (!employer) {
        return res.status(401).json("Category not found");
      }
      await CategorySchemas.deleteOne({ _id: req.body.id });
      return res.status(200).json("Category Deleted");
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  }
);

router.post("/deletesubcategory", authenticate, async (req, res) => {
  try {
    let { id } = req.body.id;
    let employer = await CategorySchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Work not found");
    }
    CategorySchemas.findOneAndUpdate(
      { _id: req.body.id },
      { $pull: { subcategories: { sid: req.body.sid } } },
      { new: true }
    )
      .then((templates) => {
        res.status(200).json(templates);
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/deleteallsubcategory", authenticate, async (req, res) => {
  try {
    let employer = await CategorySchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    var obj = {
      subcategories: [],
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/updatesubcategory", authenticate, async (req, res) => {
  try {
    let employer = await CategorySchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Work not found");
    }
    CategorySchemas.findOneAndUpdate(
      { _id: req.body.id, "subcategories.sid": req.body.sid },
      { $set: { "subcategories.$.name": req.body.name } },
      { new: true }
    )
      .then((templates) => {
        res.status(200).json(templates);
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
});

router.post("/updatecategory", authenticate, async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await CategorySchemas.findById(id);
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
