const { rateLimit } = require("express-rate-limit");
const createHttpError = require("http-errors");

exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  handler: (req, res, next) => {
    return next(createHttpError.TooManyRequests("you have reached the limit"));
  },
});
exports.home = (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to Product Review API",
    data: null,
  });
};
