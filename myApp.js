let express = require("express");
let app = express();
const path = require("path");

// Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

console.log("Hello World");

//Start a Working Express Server
// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

//Serve an HTML File
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Serve JSON on a Specific Route
app.get("/json", function (req, res) {
  res.json({ message: "Hello json" });
});

module.exports = app;
