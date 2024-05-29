const createHttpError = require("http-errors");
const Review = require("../model/review-model");
const tryCatch = require("../utils/try-catch");

module.exports = {
  // ADD REVIEW
  addReview: tryCatch(async (req, res, next) => {
    const review = await Review.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: {
        review: review,
      },
    });
  }),
  // GET REVIEWS
  getReviews: tryCatch(async (req, res, next) => {
    const review = await Review.find();
    return res.status(200).json({
      success: true,
      message: "Reviews get successfully",
      data: {
        length: review.length,
        review: review,
      },
    });
  }),
  // GET REVIEW
  getReview: tryCatch(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Review get successfully",
      data: {
        review: review,
      },
    });
  }),
  // DELETE REVIEW
  deleteReview: tryCatch(async (req, res, next) => {
    let review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return next(createHttpError.NotFound("Not Found"));
    }
    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: {
        review: null,
      },
    });
  }),
  // UPDATE REVIEW
  updateReview: tryCatch(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, {
      review: req.body.review,
      rating: req.body.rating,
    });
    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: {
        review: review,
      },
    });
  }),
};
