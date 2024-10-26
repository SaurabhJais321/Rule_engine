const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./database");
const ruleRoutes = require("./routes/ruleRouts");
const dotenv = require("dotenv");
const cors=require("cors");

dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/rules", ruleRoutes);

module.exports = app;
