const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/cloudnotebook";   //database string 

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

module.exports = connectToMongo;
