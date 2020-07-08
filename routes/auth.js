require("dotenv").config();
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

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
router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;

        try {
            // check if email exists
            let user = await User.findOne({ email });
            if (!user) res.status(400).json({ msg: "Invalid Credentials" });

            // compare the password with bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) res.status(400).json({ msg: "Invalid Credentials" });

            // JWT
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

        /**
         * After that, we're ready to validate the returned token
         */
    }
);

module.exports = router;
