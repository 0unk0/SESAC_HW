const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.user);
router.get("/detail/:id", userController.userDetail);

module.exports = router;
