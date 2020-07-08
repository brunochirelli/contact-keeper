require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const User = require("../models/User"); // Schema

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

router.post(
    "/",
    [
        check("name", "Please, add name").not().isEmpty(),
        check("email", "Please, include a valid email")
            .normalizeEmail()
            .isEmail(),
        check("password")
            .not()
            .isEmpty()
            .withMessage("Please, insert a password")
            .bail()
            .isLength({
                min: 6,
            })
            .withMessage("Please, insert a password with 6 or more characters"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

        // validated
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) res.status(400).json({ msg: "User already exists" });

            // create a new instance for the user...
            user = new User({
                name,
                email,
                password,
            });

            // generate a salt for hashing...
            const salt = await bcrypt.genSalt(10);

            // assign a hash password for the input...
            user.password = await bcrypt.hash(password, salt);

            // so, save the user.
            await user.save();

            // JWT
            const payload = {
                user: {
                    id: user.id,
                    /**
                     * full access for the user information by id
                     *
                     * Why not the e-mail ?
                     * To not expose confidential information
                     * since the id is also a unique identifier too
                     */
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
            res.status(500).send("Server error"); // server error
            // there is no need to send the error message for the user
        }
    }
);

module.exports = router;
