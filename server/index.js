const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
// const { v4: uuidv4 } = require("uuid");
const { createLink, getLink } = require("./linkController");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


// Routes
app.post("/create", createLink);
app.get("/:id", getLink);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
