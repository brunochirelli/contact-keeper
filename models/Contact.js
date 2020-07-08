const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
    user: {
        // relation with user
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: "personal",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

modules.exports = mongoose.model("contact", ContactSchema);
