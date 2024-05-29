const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    stock_status: {
      type: String,
      enum: ["instock", "outofstock"],
      default: "instock",
    },
    description: {
      type: String,
      default: null,
    },

    price: {
      type: String,
      default: null,
    },
    review: {
      review_average_rating: {
        type: Number,
        default: 0,
      },
      review_total: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

schema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});
const Product = mongoose.model("Product", schema);

module.exports = Product;
