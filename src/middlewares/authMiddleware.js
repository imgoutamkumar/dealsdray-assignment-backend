const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodeToken.userId;
    if (req.userId) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAuthenticated };
