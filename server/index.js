const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { createLink, getLink } = require("./linkController");
const connectDB = require("./db/connect");
const linkRoutes = require('./routes/linkRoutes.js')
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection



// Routes

app.use('/',linkRoutes)

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


