const express = require("express");
const route = express.Router();

const {
  Signin,
  Signup,
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
  getCart,
} = require("../controller/userController");
const {
  requireSignin,
  isEmail,
  isAdmin,
} = require("../middlewares/auth.middleware");

// auth
route.get("/signin", (req, res) => {
  res.render("Auth/Signin", { signup: true, signin: false });
});
route.post("/signin", Signin);
// ~ /users [create user]
route.get("/signup", (req, res) => {
  res.render("Auth/Signup", { signin: true, signup: false });
});
route.post("/signup", Signup);

// User

// get cart
route.get("/cart", requireSignin, getCart);

// get all user
route.get("/", getAllUser);
// view info
route.get("/:id", requireSignin, getUser);

// get form create user
route.get("/new", (req, res) => {
  res.send("form create user");
});

// get form edit user
route.get("/:id/edit", (req, res) => {
  res.send("form edit info user");
});
// update info
route.put("/:id", updateUser);

// delete user
route.delete("/:id", deleteUser);

module.exports = route;
