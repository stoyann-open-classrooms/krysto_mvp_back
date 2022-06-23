const authController = require("../controllers/authController");

// router
const router = require("express").Router();

router.post("/login", authController.login);

module.exports = router;
