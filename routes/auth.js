const express = require("express");
const router = express.Router();

/**
 * A router object is an isolated instance of middleware and routes.
 * You can think of it as a “mini-application,” capable only of performing middleware and routing functions.
 * Every Express application has a built-in app router.
 */

/**
 * @route      GET api/auth
 * @desc       Get logged in user
 * @access     Private
 */
router.get("/", (req, res) => {
    res.send("Get authenticated/logged user");
});

/**
 * @route      POST api/auth
 * @desc       Auth user & get token
 * @access     Public
 */
router.post("/", (req, res) => {
    res.send("Log in user");
});

module.exports = router;
