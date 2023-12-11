const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");

router.get("/", storeController.store);
router.get("/detail/:id", storeController.storeDetail);

module.exports = router;
