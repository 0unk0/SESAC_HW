const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get("/", itemController.item);
router.get("/detail/:id", itemController.itemDetail);

module.exports = router;
