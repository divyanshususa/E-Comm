const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const OrderSchemas = require("../schema/Orders");
const UserSchemas = require("../schema/Users");

router.get("/details", (req, res, next) => {
  const { id } = req.query;
  OrderSchemas.find({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.get("/recentorders", async (req, res) => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recentOrders = await OrderSchemas.find({
      odate: { $gte: twoDaysAgo.toISOString() },
    }).sort({ odate: -1 });

    res.json(recentOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/recent-orders", async (req, res) => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recentOrdersByVid = await OrderSchemas.find({
      odate: { $gte: twoDaysAgo.toISOString() },
      vid: req.query.vid,
    }).sort({ odate: -1 });

    res.json(recentOrdersByVid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getUserOrders", async (req, res) => {
  try {
    let { userId } = req.query;

    // Fetch orders by user ID
    const orders = await OrderSchemas.find({ uid: userId });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getactive", async (req, res) => {
  try {
    let { id } = req.query;
    OrderSchemas.find({
      uid: id,
      ostatus: { $nin: ["Delivered", "Cancelled"] },
    })
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

router.get("/getorders", async (req, res) => {
  try {
    let { id } = req.query;
    OrderSchemas.find({ uid: id })
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

router.get("/getvendorsorders", async (req, res) => {
  try {
    let { id } = req.query;
    OrderSchemas.find({ vid: id })
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

router.get("/getvendoractive", async (req, res) => {
  try {
    let { id } = req.query;
    OrderSchemas.find({
      vid: id,
      ostatus: { $nin: ["Delivered", "Cancelled"] },
    })
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

router.get("/ordersByStatus/:status", async (req, res) => {
  try {
    const { status } = req.params;
    console.log(status);

    const allowedStatus = ["ordered", "delivered", "dispatched", "cancelled"];
    if (!allowedStatus.includes(status.toLowerCase())) {
      return res.status(400).json({ error: "Invalid status" });
    }

    //   const orders = await OrderSchemas.find({ ostatus: status });
    const orders = await OrderSchemas.find({
      ostatus: new RegExp(status, "i"),
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/placeorder", async (req, res) => {
  try {
    if (req.body.coupon != null) {
      let couponv = await UserSchemas.findOne({ coupon: req.body.coupon });
      console.log("couponv");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array });
      }
      if (!couponv) {
      } else {
        var nb = couponv.balance + req.body.oprice;
        UserSchemas.findOneAndUpdate(
          { coupon: req.body.coupon },
          { balance: nb },
          function (err, doc) {}
        );
        let employer = await UserSchemas.findOne({ _id: req.body.uid });
        if (!employer) {
        } else {
          var nub = employer.balance + req.body.oprice;
          UserSchemas.findOneAndUpdate(
            { _id: req.body.uid },
            { balance: nub },
            function (err, doc) {}
          );
        }
      }
    }

    for (let i = 0; i < req.body.cart.length; i++) {
      const referc = Math.floor(Math.random() * 90000) + 10000;
      holiday = new OrderSchemas({
        odate: req.body.odate,
        edate: req.body.edate,
        ono: referc,
        oaddress: req.body.oaddress,
        oproduct: req.body.oproduct,
        ostatus: "Ordered",
        ocart: req.body.cart[i],
        rpayid: req.body.rpayid,
        uid: req.body.uid,
        vid: req.body.cart[i].vid,
        vname: req.body.vname,
        oprice: req.body.oprice,
      });
      await holiday.save();
    }

    res.json(holiday);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.get("/revenue/month", async (req, res) => {
  try {
    const revenueData = await OrderSchemas.aggregate([
      {
        $match: {
          odate: { $ne: null }, // Filter out orders where odate is null
        },
      },
      {
        $project: {
          month: { $month: { $dateFromString: { dateString: "$odate" } } }, // Extract month from odate
          totalRevenue: { $toDouble: "$oprice" }, // Convert oprice to double
        },
      },
      {
        $group: {
          _id: "$month", // Group by month
          totalRevenue: { $sum: "$totalRevenue" },
          orderCount: { $sum: 1 }, // Calculate total revenue for each month
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "January" },
                { case: { $eq: ["$_id", 2] }, then: "February" },
                { case: { $eq: ["$_id", 3] }, then: "March" },
                { case: { $eq: ["$_id", 4] }, then: "April" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "June" },
                { case: { $eq: ["$_id", 7] }, then: "July" },
                { case: { $eq: ["$_id", 8] }, then: "August" },
                { case: { $eq: ["$_id", 9] }, then: "September" },
                { case: { $eq: ["$_id", 10] }, then: "October" },
                { case: { $eq: ["$_id", 11] }, then: "November" },
                { case: { $eq: ["$_id", 12] }, then: "December" },
              ],
              default: "Unknown Month", // Handle unexpected values
            },
          },
          totalRevenue: 1,
          orderCount: 1,
        },
      },
      {
        $sort: { month: 1 }, // Sort by month in ascending order
      },
    ]);

    res.json(revenueData);
  } catch (error) {
    console.error("Error calculating revenue:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/revenue/yearly", async (req, res) => {
  try {
    // Use aggregation to group orders by year and calculate revenue
    const revenueData = await OrderSchemas.aggregate([
      {
        $match: {
          createdAt: { $exists: true, $ne: null }, // Filter out orders without a createdAt field
        },
      },
      {
        $group: {
          _id: { year: { $year: "$createdAt" } }, // Group by year
          totalRevenue: { $sum: { $toDouble: "$oprice" } }, // Calculate total revenue for each year
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          year: "$_id.year", // Project year field
          totalRevenue: 1, // Include totalRevenue field
        },
      },
      {
        $sort: { year: 1 }, // Sort by year in ascending order
      },
    ]);

    res.json(revenueData);
  } catch (error) {
    console.error("Error calculating yearly revenue:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//   router.get('/revenue/yearly', async (req, res) => {
//     try {
//       // Use aggregation to group orders by year and calculate revenue
//       const revenueData = await OrderSchemas.aggregate([
//         {
//           $match: {
//             createdAt: { $exists: true, $ne: null }, // Filter out orders without a createdAt field
//           },
//         },
//         {
//           $group: {
//             _id: { year: { $year: '$createdAt' } }, // Group by year
//             totalRevenue: { $sum: { $toDouble: '$oprice' } }, // Calculate total revenue for each year
//           },
//         },
//         {
//           $sort: { '_id.year': 1 }, // Sort by year in ascending order
//         },
//       ]);

//       res.json(revenueData);
//     } catch (error) {
//       console.error('Error calculating yearly revenue:', error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

router.get("/getallorders", async (req, res) => {
  try {
    let policies = await OrderSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/updatestatus", async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await OrderSchemas.findOne({ _id: id });
    if (!employer) {
      return res.status(401).json("Cart not found");
    }
    var obj = {
      ostatus: req.body.ostatus,
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
