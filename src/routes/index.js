const express = require("express");
const productRoutes = require("./product-routes");
const userRoutes = require("./user-routes");
const reviewRoutes = require("./review-routes");
const routes = express.Router();

routes.use("/product", productRoutes);
routes.use("/user", userRoutes);
routes.use("/review", reviewRoutes);
module.exports = routes;
