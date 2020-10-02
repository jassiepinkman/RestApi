const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const postsRoute = require("./routes/posts");
const bodyParser = require('body-parser');
const cors = require('cors');

// Body Parser to parse the response body properly.
app.use(cors());
app.use(bodyParser.json());

//Importing Routes for middleware
app.use("/posts", postsRoute);

// Middlewares
app.use("/posts", () => {
  console.log(`Middleware running in Posts.`);
});


// Default Route
app.get("/", (req, res) => {
  res.send(`At Home`);
});

// Connecting to database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB!")
);

// Listening to the server
app.listen(9000);
