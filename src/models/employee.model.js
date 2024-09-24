const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    course: [
      {
        type: String,
        required: true,
      },
    ],
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;
