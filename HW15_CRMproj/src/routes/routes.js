const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const detailController = require("../controllers/detailController");

router.get("/", (req, res, next) => {
    res.redirect("/user");
});

router.get("/user", mainController.main);
router.get("/store", mainController.main);
router.get("/order", mainController.main);
router.get("/orderitem", mainController.main);
router.get("/item", mainController.main);

router.get("/user_detail/:id", detailController.user_detail);
router.get("/store_detail/:id", detailController.store_detail);
router.get("/order_detail/:id", detailController.order_detail);
router.get("/orderitem_detail/:id", detailController.orderitem_detail);
router.get("/item_detail/:id", detailController.item_detail);
  
module.exports = router;