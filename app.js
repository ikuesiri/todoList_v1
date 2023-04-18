const express = require('express');
require('dotenv').config();
const router = require("./routes/todo.route");

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set( "view engine", "ejs");

app.use("/", router)





app.listen(process.env.PORT, ()=> console.log(`server listening at port ${process.env.PORT}`))