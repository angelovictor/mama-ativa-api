"use strict";
require("dotenv").config();
var express = require("express");
const app = express();
const cors = require("cors");
const db = require("./app/models");

/*var corsOptions = {
  origin: "https://mamativa.herokuapp.com/"//`${process.env.APP_CORS}`
};*/

app.use(cors(corsOptions));

var whitelist = ['http://mamativa.azurewebsites.net:8080', 'https://mamativa.herokuapp.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

/*app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})*/

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

// parse requests of content-type - application/json
app.use(express.json({ limit: "5mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// simple route
app.get("/", (req, res) => {
  //res.json({ message: "Welcome to MAMA ATIVA API." });
  res.send("Welcome to MAMA ATIVA API.");
});

// routes
require("./app/routes/authRoutes")(app);
require("./app/routes/userRoutes")(app);
require("./app/routes/bankMilkRoutes")(app);
require("./app/routes/donationMilkRoutes")(app);

//all routes, forever declare as last route
app.get("/*", (req, res) => {
  //blank response for undeclared routes
  res.status(404).send(" ");
});

// database
// const Role = db.role;

//db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });


// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 2,
//     name: "mod"
//   });

//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }

//initial();

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}\n`)
})

module.exports = app;
