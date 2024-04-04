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
 
   
})

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;