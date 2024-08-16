const express = require("express");
const router = express.Router();
const Str = require("@supercharge/strings");
const { check, validationResult } = require("express-validator");
const UserSchemas = require("../schema/Users");
const ProductSchemas = require("../schema/Product");
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
      const { email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }

      let user = await UserSchemas.findOne({ email });

      if (!user) {
        return res.status(401).json("User not found");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (true) {
        // Passwords match

        const token = jwt.sign({ user: { id: user._id } }, secretkey, {
          expiresIn: "24h",
        });

        res.status(200).json({ token, user });
        // res.status(200).json(user);
      } else {
        // Passwords don't match
        res.status(401).json("Incorrect password");
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

// router.post(
//     '/login',
//     [
//         check('email','Email is required').not().isEmpty(),
//         check('password','Password is required').not().isEmpty(),
//     ],
//     async (req,res) => {
//         try{
//             let {email,password} = req.body;
//             console.log(req.body);
//             const errors = validationResult(req);
//             let employer = await UserSchemas.findOne({email})
//             console.log(employer);
//             if(!errors.isEmpty()){
//                 return res.status(401).json({errors : errors.array})
//             }
//             if(!employer){
//                 return res.status(401).json("Not Found");
//             }
//             if(password==employer.password){

//                 res.status(200).json(employer);

//             }
//             else {
//                 res.status(401).json('password dont match');
//             }
//         } catch (error){
//             console.log(error.message);
//             return res.status(500).json({ msg : "Server Error....."});
//         }
//     }
// );

router.post(
  "/phonelogin",

  async (req, res) => {
    try {
      let { phone } = req.body;
      console.log(req.body);
      const errors = validationResult(req);
      let employer = await UserSchemas.findOne({ phone });
      console.log(employer);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array });
      }
      if (!employer) {
        return res.status(401).json("Not Found");
      }
      res.status(200).json(employer);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error....." });
    }
  }
);

router.get(
  "/active",

  async (req, res) => {
    try {
      let { id } = req.query;
      UserSchemas.findById(id)
        .then((result) => {
          let date_ob = new Date();
          let datec = new Date(result.expdate);
          if (date_ob <= datec) {
            res.status(200).json(result);
          } else {
            res.status(401).json("Subscription End ! Renew Now");
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: error });
        });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error....." });
    }
  }
);

router.post("/applycoupon", async (req, res) => {
  try {
    let couponv = await UserSchemas.findOne({ coupon: req.body.coupon });
    console.log(couponv);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array });
    }
    if (!couponv) {
      return res.status(401).json("Coupon Not Found");
    } else {
      return res.status(200).json("Coupon Applied");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error....." });
  }
});

router.post("/updatecaddress", async (req, res) => {
  try {
    let { id } = req.query;
    let ka = req.body;
    UserSchemas.findOneAndUpdate(
      { _id: id },
      { currentaddress: ka },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.status(200).send("Address Updated");
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error....." });
  }
});

router.post("/addaddress", async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await UserSchemas.findOne({ _id: id });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    employer.address.push(req.body);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error....." });
  }
});

router.get("/getprofile", (req, res, next) => {
  let { id } = req.query;
  UserSchemas.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.post("/getcart", async (req, res) => {
  try {
    let cart = req.body.cart;
    var cartproducts = [];
    ProductSchemas.find({ _id: { $in: cart } })
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
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    UserSchemas.find({ _id: req.body.cid, cart: { $nin: [req.body.pid] } })
      .then((result) => {
        if (result.length == 0) {
          return res.status(200).send("Already Added");
        } else {
          employer.cart.push(req.body.pid);
          employer.save();
          return res.status(200).send(employer);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/getcartlist", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    return res.send(employer.cart);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/getwishlistitem", async (req, res) => {
  try {
    let cart = req.body.wishlist;
    var cartproducts = [];
    ProductSchemas.find({ _id: { $in: cart } })
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

router.post("/addtowishlist", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    UserSchemas.find({ _id: req.body.cid, wishlist: { $nin: [req.body.pid] } })
      .then((result) => {
        if (result.length == 0) {
          return res.status(200).send("Already Added");
        } else {
          employer.wishlist.push(req.body.pid);
          employer.save();
          return res.status(200).send(employer);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/getwishlist", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    return res.send(employer.wishlist);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/removewishlist", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    var obj = {
      wishlist: [],
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/removewishitem", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    let cv = req.body.ccart;
    UserSchemas.updateOne(
      { email: req.body.email },
      {
        $pull: {
          cart: [cv],
        },
      }
    );
    res.json(employer);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/updatephone", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    var obj = {
      phone: req.body.phone,
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/removecartitem", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    let cv = req.body.ccart;
    UserSchemas.updateOne(
      { email: req.body.email },
      {
        $pull: {
          cart: [cv],
        },
      }
    );
    res.json(employer);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const referc = Str.random(5);
    let holiday = await UserSchemas.findOne({ email: req.body.email });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    if (holiday) {
      return res
        .status(401)
        .json({ msg: "Username or Phone Number already present." });
    } else {
      let holiday = await UserSchemas.findOne({ phone: req.body.phone });
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      if (holiday) {
        return res
          .status(401)
          .json({ msg: "Username or Phone Number already present." });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      holiday = new UserSchemas({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        balance: 20,
        coupon: referc,
        active: "true",
        expdate: req.body.expdate,
      });
      await holiday.save();

      //  const token = jwt.sign({ user: { id: newUser._id } }, secretkey, { expiresIn: '1h' });

      res.status(200).json({ user: holiday });
      // res.status(200).json(holiday);
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    let policies = await UserSchemas.find();
    res.json(policies);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/getaddress", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    return res.send(employer.address);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/removecart", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.cid });
    if (!employer) {
      return res.status(401).json("Customer not found");
    }
    var obj = {
      cart: [],
    };
    Object.assign(employer, obj);
    employer.save();
    return res.send(employer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/additional", async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await UserSchemas.findById(id);
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

router.post("/update", async (req, res) => {
  try {
    let { id } = req.query;
    let employer = await UserSchemas.findById(id);
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

router.post("/delete", async (req, res) => {
  try {
    let employer = await UserSchemas.findOne({ _id: req.body.id });
    if (!employer) {
      return res.status(401).json("Account not found");
    }
    await UserSchemas.deleteOne({ _id: req.body.id });
    return res.status(200).json("Account Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
