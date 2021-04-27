const express = require("express");
const {
  createFashioner,
  getAllFashioners,
  getSingleFashioner,
  updateFashioner,
  deleteFashioner,
} = require("../controllers/fashionersController");

const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post( createFashioner).get(getAllFashioners);
router
  .route("/:_id")
  .get(getSingleFashioner)
  .put(updateFashioner)
  .delete(deleteFashioner);

module.exports = router;