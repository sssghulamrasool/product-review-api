const tryCatch = require("../utils/try-catch");

module.exports = {
  login: tryCatch(async (req, res, next) => {
    return res.status(200).json({});
  }),
  logout: tryCatch(async (req, res, next) => {}),
};
