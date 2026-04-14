const mongoose = require("mongoose");

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

/**
 * Connect to MongoDB using Mongoose. The connection string is stored in the .env file as MONGO_URI.
 * The function is asynchronous and will log a message to the console if the connection is successful or if there is an error.
 */

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToDb;
