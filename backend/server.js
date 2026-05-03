require("dotenv").config();
const app = require("./src/app");

const connectToDb = require("./src/config/connectToDb.js");

/**
 * Connect to the MongoDB database.
 */
connectToDb();

const PORT = process.env.PORT || 3000;

/**
 * Start the Express server on the specified port. The server will log a message to the console when it is running.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
