const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/authMiddleware");
const EmployeeController = require("../controllers/employeeController");
router.post(
  "/create",
  AuthMiddleware.isAuthenticated,
  EmployeeController.createEmployee
);

router.get(
  "/allEmployees",
  AuthMiddleware.isAuthenticated,
  EmployeeController.getAllEmployees
);

router.get(
  "/Id/:Id",
  AuthMiddleware.isAuthenticated,
  EmployeeController.getEmployeeById
);

router.put(
  "/update/:Id",
  AuthMiddleware.isAuthenticated,
  EmployeeController.updateEmployee
);

router.delete(
  "/delete/:Id",
  AuthMiddleware.isAuthenticated,
  EmployeeController.deleteEmployeeById
);

router.get(
  "/search",
  AuthMiddleware.isAuthenticated,
  EmployeeController.searchingAndFilteringEmployees
);

module.exports = router;
