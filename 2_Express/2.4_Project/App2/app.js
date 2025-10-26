const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;

const app = express();
var items = ["Buy Food","Cook Food","Eat Food"];
let workItem = [];

app.set("view engine","ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({exended: true}))

//  fOR M2 multiple html files are required
app.get("/",function(req,res){

    let day = date.getDate();
    
    // var currnetday = today.getDay();
    // var day="";

    // if(currnetday === 6 || currnetday === 0){
    //     // res.send("Holiday")
    //     // M1
    //     // res.write("<h1>Holiday</h1>");
    //     // M2
    //     // res.sendFile(__dirname+"/index.html")
    //     // template
    //     day="Weekend";
    // } else {
    //     // res.send("WORKOUT")
    //     // M1
    //     // res.write("<p>Work1</p>");
    //     // res.write("<p>Work2</p>");
    //     // res.write("<p>Work3</p>");
    //     // M2
    //     // res.sendFile(__dirname+"/index.html")
    //     // template
    //     day="Weekday";
    // }

    // switch (currnetday) {
    //     case 0:
    //         day = "sunday"
    //         break;
    //     case 1:
    //         day = "monday"
    //         break;
    //     case 2:
    //         day = "tuesday"
    //         break;
    //     case 3:
    //         day = "wednesday"
    //         break;
    //     case 4:
    //         day = "thursday"
    //         break;
    //     case 5:
    //         day = "friday"
    //         break;
    //     case 6:
    //         day = "saturday"
    //         break;
    //     default:
    //         console.log("error");
    // }

    res.render('list',{listTitle : day, newListItem : items})
    
    // res.send();
})

app.get("/work",function(req,res){ 

  res.render('list',{listTitle: "Work List", newListItem : workItem})

})

app.get("/about",function(req,res){ 
  res.render('about')
})

app.post("/work",function(req,res){ 
  let item = req.body.newItem;
  workItem.push(item);
})

app.post("/",function(req,res){

  // console.log(req.body)

  if(req.body.list === "Work"){
    workItem.push(item);
    res.redirect("/work");
  } else {
    var item=req.body.newItem;
    items.push(item);
    // console.log(Item);
    // res.render('list',{newListItem : Item})
    res.redirect("/");
  }


})

app.listen(port, function(){
    console.log("Server is running on port 3000");
})