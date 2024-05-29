const express = require("express");
const errorMiddleware = require("./middleware/error-middleware");
const routes = require("./routes");
const { home, limiter } = require("./controllers/home-controller");
const createHttpError = require("http-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(limiter);
// ROUTES
app.get("/", home);
app.use("/api/v2/", routes);

// NOT FOUND ROUTE
app.all("*", (req, res, next) => {
  next(createHttpError.NotFound("Not Found" + req.originalUrl));
});

// GLOBAL ERROR MIDDLEWARE
app.use(errorMiddleware);

module.exports = app;
