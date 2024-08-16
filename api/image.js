const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const BannerSchemas = require("../schema/Banners");
const ProductSchemas = require("../schema/Product");

router.get("/getbanners", async (req, res) => {
  try {
    let policies = await BannerSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/addbanners", async (req, res) => {
  try {
    let holiday = new BannerSchemas({
      adlink: req.body.adlink,
      addes: req.body.addes,
      tittle: req.body.tittle,
      discount: req.body.discount,
    });

    ProductSchemas.find({ poffer: "yes" })
      .then(async (result) => {
        for (let i = 0; i < result.length; i++) {
          console.log(result[i]);
          let employer = await ProductSchemas.findOne({ _id: result[i]._id });
          var obj = {
            dprice:
              employer.aprice - employer.aprice * (req.body.discount / 100),
          };
          Object.assign(employer, obj);
          employer.save();
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
    await holiday.save();
    res.json(holiday);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/addfoodbanners", async (req, res) => {
  try {
    let holiday = new BannerSchemas({
      adlink: req.body.adlink,
      addes: req.body.addes,
      tittle: req.body.tittle,
      discount: req.body.discount,
      category: req.body.category,
    });

    ProductSchemas.find({ pcat: req.body.category })
      .then(async (result) => {
        for (let i = 0; i < result.length; i++) {
          console.log(result[i]);
          let employer = await ProductSchemas.findOne({ _id: result[i]._id });
          var obj = {
            dprice:
              employer.aprice - employer.aprice * (req.body.discount / 100),
          };
          Object.assign(employer, obj);
          employer.save();
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
    await holiday.save();
    res.json(holiday);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/deletebanner", async (req, res) => {
  try {
    let employer = await BannerSchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Banner not found");
    }
    await BannerSchemas.deleteOne({ _id: req.body.id });
    return res.status(200).json("Banner Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});
module.exports = router;
