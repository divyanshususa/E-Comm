const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const WishSchemas = require("../schema/Wishlist");
const ProductSchemas = require("../schema/Product");

router.get("/details", (req, res, next) => {
  const { id } = req.query;
  WishSchemas.find({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

// router.get('/getwishlist',async (req,res) => {
//     try{
//         let {id}=req.query;
//         WishSchemas.find({ "cid":id  }).then(result=>
//             {
//                 res.status(200).json(result)
//         }).catch(error=>{
//                     console.log(error);
//                         res.status(500).json(
//                             {error:error}
//                         )
//         })
//     }
//     catch(err){
//         res.json({msg:err.message});
//     }
// });

router.get("/getwishlist", async (req, res) => {
  try {
    let { id } = req.query;

    const wishlistItems = await WishSchemas.find({ cid: id });
    console.log(wishlistItems);

    const productIds = wishlistItems.map((item) => item.pid);

    console.log("productIds:", productIds);

    const products = await ProductSchemas.find({ _id: { $in: productIds } });

    //   let products = [];

    //   for (let n=0; n<=productIds.length; n++) {
    //    let product = await ProductSchemas.findById(productIds[n]);
    //     if (product) {
    //       products.push(product);
    //     }
    //   }

    console.log("Fetched Products:", products);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// router.get('/getwishlist', async (req, res) => {
//     try {
//       let { id } = req.query;

//       // Find wishlist items for the given user id
//       const wishlistItems = await WishSchemas.find({ "cid": id });

//       // Extract product ids from wishlist items
//       const productIds = wishlistItems.map(item => mongoose.Types.ObjectId(item.pid));
//             console.log(productIds)
//       // Fetch product details for the extracted product ids
//       const products = await ProductSchemas.find({ "_id": { $in: productIds } });
//       console.log('Fetched Products:', products);

//       res.status(200).json(products);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: error.message });
//     }
//   });

router.post("/addtowishlist", async (req, res) => {
  try {
    WishSchemas.find({ cid: req.body.cid, pid: req.body.pid })
      .then(async (result) => {
        if (result.length == 0) {
          holiday = new WishSchemas({ pid: req.body.pid, cid: req.body.cid });
          console.log(holiday);
          await holiday.save();
          res.json(holiday);
        } else {
          return res.status(200).send("Already  Added");
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

router.get("/getallwishlist", async (req, res) => {
  try {
    let policies = await WishSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/deletewishlistitem", async (req, res) => {
  try {
    let employer = await WishSchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Cart Item not found");
    }
    await WishSchemas.deleteOne({ _id: req.body.id });
    return res.status(200).json("Cart Item Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
