const express = require("express");
const route = express.Router();
const userRoute = require("./userRoute");

let Router = (app) => {
  route.use("/user", userRoute);
  app.use("/api", route);
};

module.exports = Router;
