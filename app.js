"use strict";
var express = require("express");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  //res.json({ message: "Welcome to MAMA ATIVA API." });
  res.send("Welcome to MAMA ATIVA API.");
});

// routes
require("./app/routes/authRoutes")(app);
require("./app/routes/userRoutes")(app);

//all routes, forever declare as last route
app.get("/*", (req, res) => {
  //blank response for undeclared routes
  res.status(404).send(" ");
});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;
