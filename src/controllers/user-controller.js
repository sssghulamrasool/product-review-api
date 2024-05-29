const createHttpError = require("http-errors");
const tryCatch = require("../utils/try-catch");
const User = require("../model/user-model");
module.exports = {
  // ADD USER
  addUser: tryCatch(async (req, res, next) => {
    const user = await User.create(req.body);
    return res.status(201).json({
      success: true,
      message: "User added successfully",
      data: {
        user: user,
      },
    });
  }),
  // GET USERS
  getUsers: tryCatch(async (req, res, next) => {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "User get successfully",
      data: {
        length: users.length,
        user: users,
      },
    });
  }),
  // GET USER
  getUser: tryCatch(async (req, res, next) => {
    return res.status(200).json({
      success: true,
      message: "User get successfully",
      data: {
        user: null,
      },
    });
  }),
  // DELETE USER
  deleteUser: tryCatch(async (req, res, next) => {
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {
        user: null,
      },
    });
  }),
  // UPDATE USER
  updateUser: tryCatch(async (req, res, next) => {
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: null,
      },
    });
  }),
  login: tryCatch(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user.password !== req.body.password) {
      return next(createHttpError.BadRequest("Password  is incorrect"));
    }
    return res.status(200).json({
      success: true,
      message: "Login get successfully",
      data: {
        user: user,
      },
    });
  }),
};
