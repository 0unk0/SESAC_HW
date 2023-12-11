const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/", orderController.order);
router.get("/detail/:id", orderController.orderDetail);

module.exports = router;
