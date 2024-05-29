const express = require("express");
const router = express.Router();
const controllers = require("../controllers/review-controller");

router.route("/").get(controllers.getReviews).post(controllers.addReview);
router
  .route("/:id")
  .delete(controllers.deleteReview)
  .get(controllers.getReview)
  .put(controllers.updateReview);

module.exports = router;
