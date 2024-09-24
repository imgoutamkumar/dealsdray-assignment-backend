const mongoose = require("mongoose");

const mongodbUrl = process.env.MONGODB_URL;

const connectDb = () => {
  return mongoose
    .connect(mongodbUrl)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => console.log(error));
};

module.exports = { connectDb };
