const Employee = require("../models/employee.model");

const createEmployee = async (req, res) => {
  const { fullName, email, mobileNo, designation, gender, course } = req.body;
  console.log(fullName, email);
  console.log(req.body);
  try {
    const employee = await Employee.create({
      fullName,
      email,
      mobileNo,
      designation,
      gender,
      course,
    });
    res.status(200).send("employee created");
  } catch (error) {
    console.log("error", error);
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { fullName, email, mobileNo, designation, gender, course } = req.body;
    const existingEmployee = await Employee.findOne({ _id: req.params.Id });
    if (!existingEmployee) {
      return res
        .status(400)
        .send({ message: "employee does't exist with this id" });
    }

    existingEmployee.fullName = fullName;
    existingEmployee.email = email;
    existingEmployee.mobileNo = mobileNo;
    existingEmployee.designation = designation;
    existingEmployee.gender = gender;
    existingEmployee.course = course;
    await existingEmployee.save();
    return res.send({
      message: "employee updated",
      data: { existingEmployee },
    });
  } catch (error) {
    console.log(error);
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.Id;
    const employee = await Employee.findById(employeeId);
    res.status(200).send(employee);
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.Id;
    await Employee.findByIdAndDelete(employeeId);
    res.send("employee deleted");
  } catch (error) {
    console.log(error);
  }
};

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json({ employees });
};

const searchingAndFilteringEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "_id";

    const employeesList = await Employee.find({
      fullName: { $regex: search, $options: "i" },
    })
      .skip(page * limit)
      .limit(limit);

    res.status(200).send({ employeesList });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  searchingAndFilteringEmployees,
};
