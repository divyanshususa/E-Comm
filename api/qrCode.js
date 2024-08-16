const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const QRCode = require("qrcode");
const crypto = require("crypto");
const OrderSchemas = require("../schema/Orders");
const { ObjectId } = mongoose.Types;
// In-memory storage for generated tokens and their expiration status
const tokenStore = new Map();

router.get("/qrcode", (req, res) => {
  // Assuming you have customerID, OrderId, and vendorID from your application
  const { cid, oid, vid } = req.query;

  // Generate a unique and secure token
  const token = generateToken(cid, oid, vid);

  // Create a one-time URL with the token and additional parameters
  const oneTimeUrl = `https://c513-2405-201-3039-500e-f1df-6518-3619-1a0e.ngrok-free.app/api/qr/verify?q=${token}&cid=${cid}&oid=${oid}&vid=${vid}`;

  // Store the token with its expiration status (initially set to false)
  tokenStore.set(token, false);

  // Generate the QR code for the one-time URL
  QRCode.toDataURL(oneTimeUrl, (err, qrcode) => {
    if (err) {
      // Handle the error, for example, send an error response
      res.status(500).send("Error generating QR code");
    } else {
      // Send the QR code embedded in an HTML page
      // const htmlResponse = `
      //   <!DOCTYPE html>
      //   <html>
      //     <head>
      //       <title>QR Code Page</title>
      //     </head>
      //     <body>
      //       <img src="${qrcode}" alt="QR Code for ${oneTimeUrl}">
      //     </body>
      //   </html>
      // `;
      res.send(qrcode);
    }
  });
});

router.get("/verify", async (req, res) => {
  const { q: token, cid, oid, vid } = req.query;
  console.log("QR scanned...");

  if (isValidToken(token) && !tokenStore.get(token)) {
    if (await isValidCustomerProductVendor(cid, oid, vid)) {
      // Mark the token as scanned

      tokenStore.set(token, true);

      res.send("Transaction Successfully Done \nQR code scanned successfully!");
    } else {
      res.status(400).send("Invalid customer ID, Order ID, or vendor ID");
    }
  } else {
    res.status(400).send("Invalid or expired QR code");
  }
});

function generateToken(customerID, OrderId, vendorID) {
  const baseToken = `${customerID}-${OrderId}-${vendorID}-`;
  const randomBytes = crypto.randomBytes(16).toString("hex");
  return `${baseToken}${randomBytes}`;
}

// Dummy function for token validation (replace with your actual validation logic)
function isValidToken(token) {
  // Perform token validation logic
  // Return true if the token is valid, false otherwise
  return true;
}

async function isValidCustomerProductVendor(customerId, orderId, vendorId) {
  try {
    // Find the order by orderId
    const objectIdOrderId = mongoose.Types.ObjectId(orderId);
    // console.log(objectIdOrderId)
    const order = await OrderSchemas.findOne({ _id: objectIdOrderId }).exec();

    if (order === null) {
      return false;
    }

    if (order) {
      // Extract uid (customer ID) and vid (vendor ID) from the order
      const { uid, vid } = order;

      // Validate customer ID, order ID, and vendor ID
      const isCustomerValid = customerId === uid;
      const isVendorValid = vendorId === vid;

      return isCustomerValid && isVendorValid;
    } else {
      // Order not found
      return false;
    }
  } catch (error) {
    console.error("Error validating IDs:", error);
    return false;
  }
}

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const QRCode = require('qrcode');
// const crypto = require('crypto');

// // In-memory storage for generated tokens and their expiration status
// const tokenStore = new Map();

// router.get('/qrcode', (req, res) => {
//   // Generate a unique and secure token
//   const token = generateToken();

//   // Create a one-time URL with the token
//   const oneTimeUrl = `https://23d7-157-34-196-11.ngrok-free.app/api/qr/verify?q=${token}`;

//   // Store the token with its expiration status (initially set to false)
//   tokenStore.set(token, false);

//   // Generate the QR code for the one-time URL
//   QRCode.toDataURL(oneTimeUrl, (err, qrcode) => {
//     if (err) {
//       // Handle the error, for example, send an error response
//       res.status(500).send('Error generating QR code');
//     } else {
//       // Send the QR code embedded in an HTML page
//       const htmlResponse = `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <title>QR Code Page</title>
//           </head>
//           <body>
//             <img src="${qrcode}" alt="QR Code for ${oneTimeUrl}">
//           </body>
//         </html>
//       `;
//       res.send(htmlResponse);
//     }
//   });
// });

// // Endpoint for verifying the one-time URL
// router.get('/verify', (req, res) => {
//   const token = req.query.q;
//   console.log("QR scanned...");

//   // Verify the token and check if it has been scanned before
//   if (isValidToken(token) && !tokenStore.get(token)) {
//     // Mark the token as scanned
//     tokenStore.set(token, true);
//     res.send('QR code scanned successfully!');
//   } else {
//     // Invalid token or already scanned, handle accordingly
//     res.status(400).send('Invalid or expired QR code');
//   }
// });

// // Helper function to generate a secure token
// function generateToken() {
//   return crypto.randomBytes(16).toString('hex');
// }

// // Dummy function for token validation (replace with your actual validation logic)
// function isValidToken(token) {
//   // Perform token validation logic
//   // Return true if the token is valid, false otherwise
//   return true;
// }

// module.exports = router;
