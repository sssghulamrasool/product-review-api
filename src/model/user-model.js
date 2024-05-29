const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    phone: {
      type: String,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      unique: [true, "email is already existed"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", schema);

module.exports = User;
