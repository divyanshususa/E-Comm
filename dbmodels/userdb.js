const { MongoClient } = require("mongodb");

// const url = 'mongodb+srv://viaanmart:viaan@cluster0.5d7z7.mongodb.net/viaan?retryWrites=true&w=majority';

const url =
  "mongodb+srv://susalabs:susalabs@cluster0.xn0yck9.mongodb.net/?retryWrites=true&w=majority";
  
const client = new MongoClient(url);
const dbname = "CRM";

async function udbconnect() {
  let result = await client.connect();
  db = result.db(dbname);
  return db.collection("users");
}

module.exports = udbconnect;
