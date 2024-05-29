const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user-controller");

router.route("/").get(controllers.getUsers).post(controllers.addUser);
router.route("/login").post(controllers.login);
router
  .route("/:id")
  .delete(controllers.deleteUser)
  .get(controllers.getUser)
  .put(controllers.updateUser);

module.exports = router;
