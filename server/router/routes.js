const express = require("express");
const router = express.Router();
const {
  registerPlant,
  getPlants,
  showPlant,
  signUp,
  signIn,
  updatePlant,
  deletePlant,
  userInfo,
  addCart,
  viewCart,
deleteCart,
placeOrder
} = require("../controls/service.js");
const upload = require("../multer/uploads.js");

router.route("/addplant").post(upload.array("images", 5), registerPlant);
router.route("/plants").get(getPlants);
router.route("/plants/:id").get(showPlant);
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/editplant/:id").put(updatePlant);
router.route("/deleteplant/:id").delete(deletePlant);
router.route("/userinfo").get(userInfo);
router.route("/addtocart").post(addCart);
router.route("/cart").post(viewCart);
router.route("/deletecart/:pcode").delete(deleteCart);
router.route("/order").post(placeOrder);


module.exports = router;
