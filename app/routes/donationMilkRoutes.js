"use strict";
const { authJwt } = require("../middleware");
const controller = require("../controllers/donationMilkController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/donationMilk", controller.donateMilk);
  app.get("/api/donationMilk/:id", controller.userListDonateMilk);
  app.put("/api/donationMilk/:id", controller.userUpdateDonateMilk);
  app.delete("/api/donationMilk/:id", controller.userDeleteDonateMilk);
};
