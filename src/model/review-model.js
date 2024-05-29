const mongoose = require("mongoose");
const Product = require("./product-model");

const schema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["approved", "hold", "spam"],
      default: "approved",
    },
    reviewer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    review: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
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

schema.statics.calculateRating = async function (product) {
  const stats = await this.aggregate([
    {
      $match: { product: product },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(product, {
      review: {
        review_total: stats[0].nRating,
        review_average_rating: stats[0].avgRating,
      },
    });
  } else {
    await Product.findByIdAndUpdate(product, {
      review: {
        review_total: 0,
        review_average_rating: 0,
      },
    });
  }
};

schema.post("save", async function (doc) {
  if (doc) {
    await doc.constructor.calculateRating(doc.product);
  }
});

schema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.calculateRating(doc.product);
  }
});

schema.pre(/^find/, function (next) {
  this.populate({
    path: "reviewer",
  });
  next();
});
const Review = mongoose.model("Review", schema);

module.exports = Review;
