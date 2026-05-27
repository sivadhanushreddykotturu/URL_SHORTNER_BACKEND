const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const urlRoute = require("./routes/url");
const connectToDB = require("./connect")
connectToDB(process.env.MONGODB_URI);

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));
app.use("/",urlRoute);


const PORT = process.env.PORT 
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});
