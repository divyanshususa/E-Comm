const jwt = require("jsonwebtoken");
const userdb = require("../schema/Users");
const admindb = require("../schema/Admin");
const vendordb = require("../schema/Vendors");
const secretkey = "qwertyuiopasdfghjklzxcvbnmlkjhgf";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("inside..", token);

    const verifyToken = jwt.verify(token, secretkey);
    console.log("...>", verifyToken);

    if (!verifyToken) {
      throw new Error("Invalid token");
    }

    if (verifyToken.user) {
      const rootUser = await userdb.findOne({ _id: verifyToken.user.id });

      if (!rootUser) {
        throw new Error("User not found");
      }

      req.token = token;
      req.rootUser = rootUser;
      req.userId = rootUser._id;
    } else if (verifyToken.superAdmin) {
      const rootAdmin = await admindb.findOne({
        _id: verifyToken.superAdmin.id,
      });

      if (!rootAdmin) {
        throw new Error("Admin not found");
      }

      req.token = token;
      req.rootAdmin = rootAdmin;
    } else if (verifyToken.employer) {
      const rootVendor = await vendordb.findOne({
        _id: verifyToken.employer.id,
      });

      if (!rootVendor) {
        throw new Error("Vendor not found");
      }

      req.token = token;
      req.rootVendor = rootVendor;
    } else {
      throw new Error("Invalid token");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ status: 401, message: "Unauthorized access" });
  }
};

module.exports = authenticate;
