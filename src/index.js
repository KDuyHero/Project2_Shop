const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

require("dotenv").config();

const Router = require("./routes");
const connectDB = require("./config/connectDb");

const PORT = process.env.PORT;
const configViewEngine = require("./config/configViewEngine");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("src/public"));

configViewEngine(app);
Router(app);
connectDB();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/api`);
});
