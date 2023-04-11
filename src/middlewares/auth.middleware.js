const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireSignin = async (req, res, next) => {
  // get token from headers

  try {
    if (
      req.headers["authorization"] &&
      req.headers["authorization"].startsWith("bearer")
    ) {
      const token = req.headers["authorization"].split(" ")[1];
      if (!token) {
        return res.status(404).json({
          message: "No token",
        });
      }
      const { email } = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findOne({ email }).exec();
      next();
    } else {
      return res.status(404).json({
        message: "No token",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

let isEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(email)) {
    next();
  }

  res.send("not pass");
};

// behind middleware requireSignin
let isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  }

  return res.send("is not admin");
};
module.exports = { requireSignin, isEmail, isAdmin };
