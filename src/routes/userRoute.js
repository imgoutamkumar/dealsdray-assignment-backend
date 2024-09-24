const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/authMiddleware");
const UserController = require("../controllers/userController");

router.get(
  "/userId/:Id",
  AuthMiddleware.isAuthenticated,
  UserController.getUserById
);

module.exports = router;
