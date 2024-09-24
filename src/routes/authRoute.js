const AuthController = require("../controllers/authController");
const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/authMiddleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthMiddleware.isAuthenticated, AuthController.logOut);

module.exports = router;
