const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env" });
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Db = require("./config/db");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const employeeRoute = require("./routes/employeeRoute");
app.use("/employee", employeeRoute);

app.listen(process.env.PORT, async () => {
  await Db.connectDb();
  console.log("Server Connected On Port : ", process.env.PORT);
});
