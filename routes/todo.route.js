const express = require("express");
const router = express.Router();
const getDate = require("../date");
const mongoose = require("mongoose");
const _ = require("lodash");

//Create a items Schema  document

const itemsSchema = ({
    name: String
})

//create a items model from the Schema
const Items =  mongoose.model("Item", itemsSchema);

const items1 = new Items({ name : "Welcome to TO-DO list App"});
const items2 = new Items({ name : "click '+' to Create a New task"});
const items3 = new Items({ name : "Click 'check box' to delete task"});
const defaultItems = [items1, items2, items3];

// create a List Schema document

const listSchema = ({
    name : String,
    items : [itemsSchema]
});

//create a list model
const List = mongoose.model("List", listSchema);

// Render to the template file
//@Desc Home Route
//method GET  "/"
router.get("/", async(req, res) =>{

    const day = await getDate();
        const foundItems = await Items.find();
        
        if(foundItems.length < 3){
            await Items.deleteMany({});
            await Items.insertMany(defaultItems);
            res.redirect("/");
        }else{

            res.render("todoList",{
                listCategory: "Home",
                day,
                addNewItems: foundItems
            });
        } 
});

//@Desc creating custom route
//method GET  "/:customName"

router.get("/:customName" , async(req, res) =>{
    const customName = _.capitalize(req.params.customName);
    const day = await getDate();
  const foundList = await List.findOne({name : customName })
  if(!foundList){
      const list =  await new List({
          name: customName,
        items: defaultItems
    })
     await list.save();
     res.redirect("/" + list.name)
  }else{
    res.render("todoList",{
        listCategory: foundList.name,
        day,
        addNewItems: foundList.items
    });
   } 
})

//@Desc Home Route
//method POST  "/"
router.post("/", async(req, res) =>{
    const newItem  = req.body.item;
    const listCategory  = req.body.list;
        const item = new Items({
            name: newItem
        })
           if( listCategory === "Home"){
            await item.save();
            res.redirect("/");
        }else{
           const list = await List.findOne({name : listCategory})
           await list.items.push(item);
           await list.save();
           res.redirect("/" + listCategory);

        }   
})


//@Desc Delete Route
//method POST  "/delete"
router.post("/delete", async(req, res) =>{
    const checkedItemId = req.body.checkbox;
    const listName = req.body.list;
    if(listName === "Home"){
        await Items.findOneAndDelete({_id: checkedItemId })
        res.redirect("/" );
    }else{
        
        await  List.findOneAndUpdate({name: listName }, {
            $pull : {items:{_id : checkedItemId} }
        });
        res.redirect("/" + listName);

            
    }
    

})





module.exports = router;