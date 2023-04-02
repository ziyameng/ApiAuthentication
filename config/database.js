const mongoose = require("mongoose");
require("dotenv").config();
const MongoDB = process.env.MOGO_URL;
const connectDB = async () => {
  await mongoose.connect(MongoDB, {
    useUnifiedTopology: true,
  });
  console.log("MongoDB is Connected!");
};

module.exports = connectDB;
