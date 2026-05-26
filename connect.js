const mongoose = require("mongoose");

async function connectToDB(url){
    try{
        await mongoose.connect(url);
        console.log("Connected to Mongodb");
    }
    catch(err){
        console.log("Mongodb connection failed "+err)
    }
}

module.exports = connectToDB;