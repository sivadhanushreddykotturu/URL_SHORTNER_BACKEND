const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const connectToDB = require("./connect")
connectToDB('mongodb://localhost:27017/url-project_agian');
app.use(express.json());


app.use("/",urlRoute);

app.listen(8000)
