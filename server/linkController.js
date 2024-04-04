
const ShortUniqueId = require('short-unique-id');
const Link = require("./Model/linkModel");

// Secret key for JWT token

// Controller function for creating a link
const createLink =async (req, res)=> {
  const host = req.headers['host'];
  const protocol = req.protocol;
  try {
    const { url } = req.body;

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

    //Short Unique Id
    const uid = new ShortUniqueId({ length: 10 });
    const linkId = uid.rnd();


    console.log(linkId)

    let finalLink = `${protocol}://`+req.headers['host']+ `/${linkId}`

    await Link.create({
      url,
      linkId,
    })

    // Save link data to MongoDB

    res.json({
      url,
      link : finalLink

    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}

// Controller function for getting a link by ID
const getLink = async(req, res)=> {

  console.log('came here')
  try {
    const linkId = req.params.id;

    

    // Retrieve link data from MongoDB using the linkId
    const link = await Link.findOne({ linkId });

    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    // You need to compare the hashed URL with the incoming URL


 

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