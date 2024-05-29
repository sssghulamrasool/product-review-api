const mongoose = require("mongoose");
const logger = require("./logger");

const databaseConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/product-review-api")
    .then(() => logger.info("database connected successfully"))
    .catch((err) => logger.error("mongoDB connection error"));
};

module.exports = databaseConnection;
