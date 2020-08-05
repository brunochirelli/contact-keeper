const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // wherever we need to protect routes
const { check, validationResult } = require("express-validator");

const User = require("../models/User"); // To reference
const Contact = require("../models/Contact");

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
router.get("/", auth, async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id }).sort({
    date: -1,
  });

  try {
    if (contacts) res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route      POST api/contacts
 * @desc       Add new contact
 * @access     Private
 */
router.post(
  "/",
  // for multiple middlewares, use array
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      } else {
        const { name, email, phone, type } = req.body;
        const newContact = new Contact({
          name,
          email,
          phone,
          type,
          user: req.user.id, // the user that is authenticated
        });

        const contact = await newContact.save();

        res.json(contact);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route      PUT api/contacts/:id
 * @desc       Update contact by :id
 * @access     Private
 */
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Create a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id); // uri :id param

    if (!contact) res.status(404).json({ msg: "Contact not found" });

    // Check if the user owns this contact
    if (contact.user.toString() !== req.user.id)
      res.status(404).json({ msg: "Not authorized" });

    // So, find the contact by id and update
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route      DELETE api/contacts/:id
 * @desc       Delete a contact by :id
 * @access     Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) res.status(404).json({ msg: "Contact not found" });

    // Check if the user owns this contact
    if (contact.user.toString() !== req.user.id)
      res.status(404).json({ msg: "Not authorized" });

    // So, find the contact by id and delete
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
