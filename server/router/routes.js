const express = require("express");
const router = express.Router();
const { registerPlant, getPlants, showPlant } = require("../controls/service.js");
const upload = require("../multer/uploads.js");

router.route("/addplant").post(upload.array("images", 5), registerPlant);
router.route("/plants").get(getPlants);
router.route("/plants/:id").get(showPlant);

module.exports = router;
