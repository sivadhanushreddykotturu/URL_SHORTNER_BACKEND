const express = require("express");
require("dotenv").config();
const app = express();
const urlRoute = require("./routes/url");
const connectToDB = require("./connect")
connectToDB(process.env.MONGODB_URI);

app.use(express.json());


app.use("/",urlRoute);

app.listen(8000)
