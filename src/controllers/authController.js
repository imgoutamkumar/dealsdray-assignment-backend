const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);
  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.send("user already exist with this email");
      throw new Error("user already exist with this email");
    }
    const user = await User.create({
      fullName,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(400).send("User not registered");
    } else {
      const isMatch = await bcrypt.compare(password, isUserExist.password);
      if (isMatch) {
        const token = jwt.sign(
          {
            userId: isUserExist._id,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        /* await res.cookie("token", token, {
          httpOnly: true,
        }); */

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 86400000,
        });

        return res.status(200).send({
          message: "login success",
          userId: isUserExist._id,
          jwt: token,
        });
      } else {
        return res.status(400).send("incorrect password");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong");
  }
};

const logOut = (req, res) => {
  console.log("logout called");
  res.clearCookie("token");
  /* res.cookie("token", "", {
    expires: new Date(0),
  });
  console.log(); */
  return res.status(200).send({ message: "logout successfully" });
};

module.exports = { register, login, logOut };
