const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController.js");
const { readTable, readDetail } = require("../middlewares/readTableMiddleware.js");
const setPageInfo = require("../middlewares/setPageInfoMiddleware.js");

router.get("/", (req, res) => {
  res.redirect("/user");
});

router.get("/user", readTable("users"), setPageInfo("user"), mainController.main);
router.get("/order", readTable("orders"), setPageInfo("order"), mainController.main);
router.get("/orderitem", readTable("orderitems"), setPageInfo("orderitem"), mainController.main);
router.get("/item", readTable("items"), setPageInfo("item"), mainController.main);
router.get("/store", readTable("stores"), setPageInfo("store"), mainController.main);

module.exports = router;
