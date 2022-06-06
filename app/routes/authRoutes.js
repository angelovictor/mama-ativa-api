"use strict";
const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/authController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post(
    "/api/auth/signin", controller.signin
  );

  app.put(
    "/api/auth/profile/:id",
    [authJwt.verifyToken],
    controller.profileUpdate
  );

  app.delete(
    "/api/auth/profile/:id",
    [authJwt.verifyToken],
    controller.profileDelete
  );
};
