const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGODB_URL;

const initializeDB = () => {
    mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log("Mongo db connected successfully")
    })
    .catch((error)=>{
        console.log("Error connecting to db", error)
    })
}

module.exports = initializeDB;