const express = require("express");
const router = express.Router();

/**
 * A router object is an isolated instance of middleware and routes.
 * You can think of it as a “mini-application,” capable only of performing middleware and routing functions.
 * Every Express application has a built-in app router.
 */

/**
 * @route      POST api/users
 * @desc       Register a user
 * @access     Public
 */
router.post("/", (req, res) => {
    res.send("Register a user");
});

module.exports = router;
