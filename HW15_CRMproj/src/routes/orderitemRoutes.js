const express = require("express");
const router = express.Router();

const orderitemController = require("../controllers/orderitemController");

router.get("/", orderitemController.orderitem);
router.get("/detail/:id", orderitemController.orderitemDetail);

module.exports = router;
