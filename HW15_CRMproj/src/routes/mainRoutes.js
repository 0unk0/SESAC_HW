const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController.js");

router.get("/", (req, res) => {
  res.redirect("/user");
});

router.get("/user", mainController.main("user"));
router.get("/order", mainController.main("order"));
router.get("/orderitem", mainController.main("orderitem"));
router.get("/item", mainController.main("item"));
router.get("/store", mainController.main("store"));

router.get("/user_detail/:id", mainController.user_detail);
router.get("/order_detail/:id", mainController.order_detail);
router.get("/orderitem_detail/:id", mainController.orderitem_detail);
router.get("/store_detail/:id", mainController.store_detail);
router.get("/item_detail/:id", mainController.item_detail);

module.exports = router;
