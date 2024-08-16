const express = require("express");
const router = express.Router();
const ProductSchemas = require("../schema/Product");
const VendorSchemas = require("../schema/Vendors");
const AdminSchemas = require("../schema/Admin");
const geolib = require("geolib");
// const authenticate = require("../middleware/authenticate");

router.get("/details", (req, res, next) => {
  let { id } = req.query;
  console.log(req.params.id);
  ProductSchemas.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.get("/getproducts", async (req, res) => {
  try {
    let policies = await ProductSchemas.find({ active: true });
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.get("/getallproducts", async (req, res) => {
  try {
    let policies = await ProductSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.get("/getvendorproducts", async (req, res) => {
  try {
    let { vid } = req.query;
    ProductSchemas.find({ vid: vid })
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

router.get("/getcategory", async (req, res) => {
  try {
    let { category } = req.query;
    ProductSchemas.find({ pcat: category })
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

router.get("/getsuper", async (req, res) => {
  try {
    ProductSchemas.find({ poffer: "yes", active: true })
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

router.get("/getbanner", async (req, res) => {
  try {
    ProductSchemas.find({ poffer: "yes" })
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

router.post("/addproduct", async (req, res) => {
  try {
    console.log(req.body);
    let { adminkey } = req.query;
    const { latitude, longitude } = req.body.geolocation;

    console.log(latitude, longitude);
    let hr = await VendorSchemas.findById(adminkey);
    if (!hr) {
      let isadmin = await AdminSchemas.findById(adminkey);
      if (!isadmin) {
        return res.status(401).json({ msg: "unauthorized" });
      }
    }

    holiday = new ProductSchemas({
      pname: req.body.pname,
      pdes: req.body.pdes,
      aprice: req.body.aprice,
      dprice: req.body.dprice,
      pphoto: req.body.pphoto,
      pcat: req.body.pcat,
      pictures: req.body.pictures,
      noofStock: req.body.noofStock,
      psub: req.body.psub,
      vid: adminkey,
      dust: req.body.dust,
      moi: req.body.moi,
      active: false,
      gcv: req.body.gcv,
      geolocation: {
        type: "Point",
        coordinates: [latitude, longitude],
      },
    });
    await holiday.save();
    res.json(holiday);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post(
  "/updatedprice",

  async (req, res) => {
    try {
      let employer = await ProductSchemas.findOne({ _id: req.body.cid });
      // if (!employer) {
      //     return res.status(401).json("Product not found");
      // }
      var obj = {
        dprice: req.body.dprice,
      };
      Object.assign(employer, obj);
      employer.save();
      return res.send(employer);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  }
);

// router.get('/search', async (req, res) => {
//     try {
//         const search = req.query.search;

//         if (!search) {
//             return res.status(400).json({ message: 'Search query is required' });
//         }

//         const results = await ProductSchemas.find({
//             $or: [
//                 { pname: { $regex: search, $options: 'i' } },
//                 { pdes: { $regex: search, $options: 'i' } },
//                 { pcat: { $regex: search, $options: 'i' } },
//             ],
//         });

//         res.status(200).json({ message: 'success', products: results });
//     } catch (error) {
//         console.error('Error searching products:', error.message);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

router.get("/search", async (req, res) => {
  try {
    const search = req.query.search;
    const userLatitude = req.query.latitude; // Example header for user's latitude
    const userLongitude = req.query.longitude; // Example header for user's longitude
    console.log("search parameter:", search);
    console.log("search latitude:", userLatitude);
    console.log("search longitude:", userLongitude);

    if (!search) {
      return res.status(400).json({ message: "Search query is required" });
    }

    let query = {
      $or: [
        // { pname: { $regex: search, $options: "i" } },
        // { pdes: { $regex: search, $options: "i" } },
        { pcat: { $regex: search, $options: "i" } },
      ],
    };

    if (userLatitude && userLongitude) {
      // Assuming you have 'latitude' and 'longitude' fields in your product schema
      query = {
        ...query,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [
                parseFloat(userLongitude),
                parseFloat(userLatitude),
              ],
            },
            $maxDistance: 50 * 1000, // Adjust this value based on your requirements (in meters)
          },
        },
      };
    }

    const results = await ProductSchemas.find(query);
    console.log(query.$or);

    res.status(200).json({ message: "success", products: results });
  } catch (error) {
    console.error("Error searching products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/products/give-rating/:productId", async (req, res) => {
  const { userId, rating } = req.body;
  const productId = req.params.productId;

  try {
    const product = await ProductSchemas.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the user has already given a rating
    const existingRating = product.ratings.find((r) => r.userId === userId);

    if (existingRating) {
      return res
        .status(400)
        .json({ error: "User has already given a rating for this product" });
    }

    // Add the new rating
    product.ratings.push({ userId, rating });

    // Calculate the new average rating for the product
    const totalRatings = product.ratings.length;
    const totalRatingSum = product.ratings.reduce(
      (sum, r) => sum + r.rating,
      0
    );
    const averageRating = totalRatingSum / totalRatings;

    product.averageRating = averageRating;

    // Save the updated product
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/update",

  async (req, res) => {
    try {
      let employer = await ProductSchemas.findOne({ _id: req.body.cid });
      if (!employer) {
        return res.status(401).json("Product not found");
      }
      var obj = {
        active: req.body.active,
      };

      Object.assign(employer, obj);
      employer.save();
      return res.send(employer);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  }
);

router.post("/updateaprice", async (req, res) => {
  try {
    let employer = await ProductSchemas.findOne({ _id: req.body.cid });
    // if (!employer) {
    //     return res.status(401).json("Product not found");
    // }
    var obj = {
      aprice: req.body.aprice,
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/updatename", async (req, res) => {
  try {
    let employer = await ProductSchemas.findOne({ _id: req.body.cid });
    // if (!employer) {
    //     return res.status(401).json("Product not found");
    // }
    var obj = {
      pname: req.body.pname,
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/addsuperproduct", async (req, res) => {
  try {
    let { adminkey } = req.query;
    let hr = await VendorSchemas.findById(adminkey);
    if (!hr) {
      return res.status(401).json({ msg: "unauthorized" });
    }
    let employer = await ProductSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Product not found");
    }
    var obj = {
      poffer: req.body.offer,
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post(
  "/deleteproduct",

  async (req, res) => {
    try {
      let employer = await ProductSchemas.findOne({ _id: req.body.id });
      if (!employer) {
        return res.status(401).json("Product not found");
      }
      await ProductSchemas.deleteOne({ _id: req.body.id });
      return res.status(200).json("Product Deleted");
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  }
);

router.post(
  "/updatequantity",

  async (req, res) => {
    try {
      // let {id}=req.query;
      let employer = await ProductSchemas.findOne({ _id: req.body.cid });
      //    if (!employer) {
      //        return res.status(401).json("Cart not found");
      //    }
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
  }
);

module.exports = router;
