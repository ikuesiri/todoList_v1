const express = require('express');
require('dotenv').config();
const router = require("./routes/todo.route");
const connectDB = require("./mongoose/connectDB");

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set( "view engine", "ejs");

app.use("/", router)


connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server listening at port ${PORT}`));

module.exports = app;