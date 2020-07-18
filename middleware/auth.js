/**
 ** Auth middleware
 *  Check if was a token in the HEADER
 *  and protect routes with this middleware if not
 * */
require("dotenv").config;
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // has this token in the header?
    const token = req.header("x-auth-token");

    if (!token) res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // we will decode the user in the payload and move on
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
