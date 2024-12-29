let express = require("express");
let app = express();
let bodyParser = require("body-parser");
// Use the .env File
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));
// Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  console.log("I'm a middleware...");
  next();
});

console.log("Hello World");

//Start a Working Express Server
// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

//Serve an HTML File
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

// Serve JSON on a Specific Route
app.get("/json", (req, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE == "uppercase"
        ? "Hello json".toUpperCase()
        : "Hello json",
  });
});

// Chain Middleware to Create a Time Server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => res.json({ time: req.time })
);

// Get Query Parameter Input from the Client
app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

// Use body-parser to Parse POST Requests
// app.route("/name").post((req, res) => {
//   var firstName = req.query.first;
//   var lastName = req.query.last;
//   // Use template literals to form a formatted string
//   res.json({
//     name: `${firstName} ${lastName}`,
//   });
// });

// Get Data from POST Requests
app.post("/name", (req, res) => {
  console.log(req.body);
  var firstName = req.body.first;
  var lastName = req.body.last;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

// Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => res.json({ echo: req.params.word }));
module.exports = app;
