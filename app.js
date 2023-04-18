const express = require('express');
require('dotenv').config();
const getDate = require(__dirname + "/date");

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set( "view engine", "ejs");



//empty array to hold user's "general" added  tasks
let items = [];

//empty array to hold user's "work" added tasks
let workItems = [];


// Render to the template file

app.get("/", (req, res) =>{

    const day = getDate();

    res.render("todoList", {
        day,
        listItem : "General",
        addNewItems : items
    });
})


app.post("/", (req, res) =>{
    const{ item, list  }= req.body
    if(list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        
        items.push(item);
        res.redirect("/");

    }

})


app.get("/work", (req, res) =>{

    const day = getDate()

    res.render("todoList", 
        {   day,
            listItem: "Work",
            addNewItems : workItems
        })
})  


app.listen(process.env.PORT, ()=> console.log(`server listening at port ${process.env.PORT}`))