const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    linkId:{
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
    },
    validity: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // TTL index for automatic document expiration
        expires: 0, // Documents will expire immediately after validity period
    },
})

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;