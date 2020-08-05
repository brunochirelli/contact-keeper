/**
 ** Auth middleware
 *  Check if was a token in the HEADER
 *  and protect routes with this middleware if not
 * */
require("dotenv").config;
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // check if this token are in the header
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // we will decode the user in the payload and move on
    req.user = decoded.user;
    next();
  } catch (err) {
    if (token) {
      // and it's not valid
      res.status(401).json({ msg: "Token is not valid" });
    }
  }
};
