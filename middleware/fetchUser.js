const jwt = require("jsonwebtoken");
require("dotenv").config();

const fetchUser = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(401).json({ Error: "Please authenticate  using a valid token" });
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const data = jwt.verify(token, secretKey);
    req.id = data;
    next();
  } catch (error) {
    res.status(401).json({ Error: "Please authenticate  using a valid token" });
  }
};

module.exports = fetchUser;
