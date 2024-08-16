const admin = require("firebase-admin");

var serviceAccount = require("./viaanmartshop-firebase-adminsdk-eeacq-1caa74fb9d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://viaanmartshop.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};
