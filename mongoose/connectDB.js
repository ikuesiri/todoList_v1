const mongoose = require("mongoose");
require("dotenv").config();
const  mongo_uri = process.env.MONGO_URI;

const connectDB = async() => {
    await  mongoose.connect(mongo_uri);
    console.log(`DB connected`)
}

module.exports = connectDB;