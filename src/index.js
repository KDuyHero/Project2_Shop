const express = require("express");
const app = express();
var methodOverride = require("method-override");
require("dotenv").config();

const Router = require("./routes");
const connectDB = require("./config/connectDb");

const PORT = process.env.PORT;
const configViewEngine = require("./config/configViewEngine");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("src/public"));
app.use(methodOverride("_method"));

configViewEngine(app);
Router(app);
connectDB();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/api`);
});
