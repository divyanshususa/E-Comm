const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const CartSchemas = require("../schema/Cart");

router.get("/details", (req, res, next) => {
  const { id } = req.query;
  CartSchemas.find({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.get("/getcart", async (req, res) => {
  try {
    let { id } = req.query;
    CartSchemas.find({ cid: id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/addtocart", async (req, res) => {
  try {
    CartSchemas.find({ cid: req.body.cid, pid: req.body.pid })
      .then(async (result) => {
        if (result.length == 0) {
          holiday = new CartSchemas({
            pid: req.body.pid,
            cid: req.body.cid,
            quantity: req.body.quantity,
          });
          await holiday.save();
          res.json(holiday);
        } else {
          return res.status(200).send("Already Added");
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/updatequantity", async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await CartSchemas.findOne({ _id: id });
    if (!employer) {
      return res.status(401).json("Cart not found");
    }
    var obj = {
      quantity: req.body.quantity,
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.get("/getallcarts", async (req, res) => {
  try {
    let policies = await CartSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/deletecartitem", async (req, res) => {
  try {
    let employer = await CartSchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Cart Item not found");
    }
    await CartSchemas.deleteOne({ _id: req.body.id });
    return res.status(200).json("Cart Item Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/deleteallcartitem", async (req, res) => {
  try {
    let { id } = req.query;
    CartSchemas.find({ cid: id })
      .then(async (result) => {
        for (let i = 0; i < result.length; i++) {
          let employer = await CartSchemas.findOne({ _id: result[i]._id });
          if (!employer) {
          } else {
            await CartSchemas.deleteOne({ _id: result[i]._id });
          }
        }

        return res.status(200).json("Cart All Item Deleted");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
