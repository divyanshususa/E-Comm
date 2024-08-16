const express = require("express");
const router = express.Router();
const VoucherSchemea = require("../schema/Vouchers"); // Assuming you have a Voucher model

router.post("/CreateVoucher", async (req, res) => {
  try {
    const { discountPercentage, expirationDate, voucherDesc } = req.body;

    // Save the voucher to the database
    const voucher = new VoucherSchemea({
      discountPercentage,
      expirationDate,
      voucherDesc,
    });

    const savedVoucher = await voucher.save();

    res.json(savedVoucher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getvouchers", async (req, res) => {
  try {
    const vouchers = await VoucherSchemea.find();
    res.json(vouchers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

module.exports = router;
