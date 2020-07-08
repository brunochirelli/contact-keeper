const express = require("express");
const router = express.Router();

/**
 * A router object is an isolated instance of middleware and routes.
 * You can think of it as a “mini-application,” capable only of performing middleware and routing functions.
 * Every Express application has a built-in app router.
 */

/**
 * @route      GET api/contacts
 * @desc       Get all users contacts
 * @access     Private
 */
router.get("/", (req, res) => {
    res.send("Get all contacts from an user");
});

/**
 * @route      POST api/contacts
 * @desc       Add new contact
 * @access     Private
 */
router.post("/", (req, res) => {
    res.send("Add contact");
});

/**
 * @route      PUT api/contacts/:id
 * @desc       Update contact by :id
 * @access     Private
 */
router.put("/:id", (req, res) => {
    res.send("Update a contact");
});

/**
 * @route      DELETE api/contacts/:id
 * @desc       Delete a contact by :id
 * @access     Private
 */
router.delete("/:id", (req, res) => {
    res.send("Delete a contact");
});

module.exports = router;
