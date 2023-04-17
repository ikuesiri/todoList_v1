const express = require('express');
require('dotenv').config();


const app = express();

app.set( "view engine", "ejs");

const today = new Date()
 const getDay = today.getDay();


 let day = ""


app.get("/", (req, res) =>{

    switch (getDay) {
        case 0:
            day = "Sunday";
            break;
    
        case 1:
            day = "Monday";
            break;
    
        case 2:
            day = "Tuesday";
            break;
    
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";;
            break;
        case 6:
            day = "Saturday";
            break;
    
        default:
            
            console.log(`Error: Current day is ${getDay}`);
    }

    res.render("todoList", { day});
})

app.listen(process.env.PORT, ()=> console.log(`server listening at port ${process.env.PORT}`))