// importing required poackages
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const path = require('path');

// initializing express
const app = express();
app.use(cookieParser());

// configuring 
app.use(express.json());
dotenv.config({path: './config.env'});
const PORT = process.env.PORT;

// for serving the static files
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("/", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// setting up routes in auth.js
app.use(require("./router/auth"));

// connecting to database
require('./db/conn');
const User = require('./models/userSchema');



// listening to server
app.listen(PORT, ()=>{
    console.log(`Server is up and running at port ${PORT}`)
})