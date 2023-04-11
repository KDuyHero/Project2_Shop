const express = require("express");
const route = express.Router();

const {
  Signin,
  Signup,
  viewInfoUser,
  updateInfoUser,
  deleteUser,
} = require("../controller/userController");
const {
  requireSignin,
  isEmail,
  isAdmin,
} = require("../middlewares/auth.middleware");

route.post("/signin", Signin);
route.post("/signup", Signup);
route.post("/test", requireSignin, isAdmin, (req, res) => {
  res.send("pass");
});
// view info
route.get("/:id", requireSignin, viewInfoUser);
// update info
route.put("/:id", updateInfoUser);
// delete user
route.delete("/:id", deleteUser);

module.exports = route;
