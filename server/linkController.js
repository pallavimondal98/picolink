const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const ShortUniqueId = require('short-unique-id');
const Link = require("./Model/linkModel");

// Secret key for JWT token
const secretKey = process.env.JWT_SECRET;

// Controller function for creating a link
const createLink =async (req, res)=> {
  try {
    const { url, validity } = req.body;

    // Check if the originalLink is empty
    if (!url || url.trim() === "") {
      return res.status(400).json({ error: "Input Field cannot be empty" });
    }

    // Validate URL format
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // Hash the URL with bcrypt
    const hashedUrl = await bcrypt.hash(url, 10);

    //Short Unique Id
    const uid = new ShortUniqueId({ length: 10 });
    const linkId = uid.rnd();

    // Save link data to MongoDB
    const link = new Link({ linkId, url: hashedUrl, validity });
    await link.save();

    // Generate JWT token with linkId as payload
    const token = jwt.sign({ linkId }, secretKey, { expiresIn: validity * 60 * 60 * 24 }); // Expires after validity period

    // Return shortened link along with token
    res.json({ link: `${linkId}`, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}

// Controller function for getting a link by ID
const getLink = async(req, res)=> {
  try {
    const linkId = req.params.id;

    // Retrieve link data from MongoDB using the linkId
    const link = await Link.findOne({ linkId });

    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    // You need to compare the hashed URL with the incoming URL
    const isValidUrl = await bcrypt.compare(req.url, link.url);

    if (!isValidUrl) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // Return the link data
    // res.json(link);
    // Redirect to the original URL
    res.redirect(link.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = { createLink, getLink };