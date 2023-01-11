const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const dbConnection = mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((e) =>
    console.log(
      "Connection to db successful",
      e.connection.host,
      e.connection.name
    )
  )
  .catch((err) => console.log(err));

module.exports = dbConnection;
