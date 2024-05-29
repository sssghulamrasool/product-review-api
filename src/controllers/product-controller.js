const createHttpError = require("http-errors");
const Product = require("../model/product-model");
const Review = require("../model/review-model");
const tryCatch = require("../utils/try-catch");

module.exports = {
  // ADD PRODUCT
  addProduct: tryCatch(async (req, res, next) => {
    const product = await Product.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: {
        product: product,
      },
    });
  }),
  // GET PRODUCTS
  getProducts: tryCatch(async (req, res, next) => {
    const product = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Products get successfully",
      data: {
        length: product.length,
        product: product,
      },
    });
  }),
  // GET PRODUCT
  getProduct: tryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate("reviews");
    return res.status(200).json({
      success: true,
      message: "Product get successfully",
      data: {
        product: product,
      },
    });
  }),
  // DELETE PRODUCT
  deleteProduct: tryCatch(async (req, res, next) => {
    const product = await Product.deleteOne({ _id: req.params.id });

    if (!product) {
      return next(createHttpError.NotFound("Product not found"));
    }
    if (product) {
      await Review.deleteMany({ product: req.params.id });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: {
        product: null,
      },
    });
  }),
  // UPDATE PRODUCT
  updateProduct: tryCatch(async (req, res, next) => {
    let prod = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!prod) {
      return next(createHttpError.NotFound("Not Found"));
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: {
        product: prod,
      },
    });
  }),
};
