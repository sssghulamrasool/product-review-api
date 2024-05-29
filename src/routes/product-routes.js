const express = require("express");
const router = express.Router();
const controllers = require("../controllers/product-controller");

router.route("/").get(controllers.getProducts).post(controllers.addProduct);
router
  .route("/:id")
  .delete(controllers.deleteProduct)
  .get(controllers.getProduct)
  .put(controllers.updateProduct);

module.exports = router;
