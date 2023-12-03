const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController.js");
const readTableMiddleware = require("../middlewares/readTableMiddleware.js");

router.get("/", readTableMiddleware("users"), mainController.user);
router.get("/user", readTableMiddleware("users"), mainController.user);
router.get("/order", readTableMiddleware("orders"), mainController.order);
router.get("/orderitem", readTableMiddleware("orderitems"), mainController.orderitem);
router.get("/item", readTableMiddleware("items"), mainController.item);
router.get("/store", readTableMiddleware("stores"), mainController.store);

module.exports = router;
