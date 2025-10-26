// jshint esversion:6
const express = require("express");

// Function that represent express module
const app = express();

// What happen when brawser connected with server
// app.get("location",call_back_fnx(req,res){})

app.get("/",function(request,respose){
    respose.send("<h1>Hello World !</h1>");
});

app.get("/contact",function(request,respose){
    respose.send("<h1>Contact info !</h1>");
});

app.get("/about",function(request,respose){
    respose.send("<h1>About Page !</h1>");
});

// Use method of app
// app.listen(PORT, ananomous function)
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

// Localhost:3000 same as root of any website
// Localhost:3000/ root of website
// when we hit any website then brawser makes request to respective server






