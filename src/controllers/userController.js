const User = require("../models/user.model");

const getUserById = async (req, res) => {
  try {
    //const user = await User.findById(req.params.userId);
    /* here using projection to restrict the response data */

    const user = await User.findById(req.params.Id);
    /* using findOne method */
    //const user = await User.findOne({ _id: req.params.Id });
    if (user) {
      //return res.status(200).json(user);
      return res.send({ message: "user found", user: user });
    } else {
      return res.send("user not exist with this id");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserById };
