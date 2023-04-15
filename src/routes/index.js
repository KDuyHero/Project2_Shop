const express = require("express");
const fetch = require("node-fetch");
const route = express.Router();
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");

const upload = require("../config/configMulter");
let Router = (app) => {
  route.use("/users", userRoute);
  route.use("/products", productRoute);
  route.use("/carts", cartRoute);
  route.get("/", async (req, res) => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      let data = await response.json();
      if (data.message === "OK") {
        return res.render("Homepage", {
          products: data.products,
          signin: true,
          signup: true,
        });
      } else {
        res.send("error");
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  });
  route.post("/upload", upload.single("singleFile"), (req, res) => {
    console.log("upload");
    const file = req.file;
    if (file) {
      res.send(file);
    } else {
      res.send("no file");
    }
  });
  app.use("/api", route);
};

module.exports = Router;
