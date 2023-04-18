const express = require("express");
const router = express.Router();
const getDate = require("../date");


//empty array to hold user's "general" added  tasks
let items = [];

//empty array to hold user's "work" added tasks
let workItems = [];


// Render to the template file
//@Desc Home Route
//method GET  "/"
router.get("/", (req, res) =>{

    const day = getDate();

    res.render("todoList", {
        day,
        listItem : "General",
        addNewItems : items
    });
})



// Captures users input
//@Desc Home Route
//method POST  "/"

router.post("/", (req, res) =>{
    const{ item, list  }= req.body
    if(list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        
        items.push(item);
        res.redirect("/");

    }

})


// Captures users input
//@Desc work Route
//method POST  "/work"

router.get("/work", (req, res) =>{

    const day = getDate()

    res.render("todoList", 
        {   day,
            listItem: "Work",
            addNewItems : workItems
        })
})  


module.exports = router;