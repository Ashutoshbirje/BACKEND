// 
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// bodyParser / .text / .json / .urlencoded
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
    // console.log(__dirname)
    res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2
    console.log(req.body);
    res.send("The result of the calculation is " + result)
});

app.get("/bmicalculator",function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html")
});

app.post("/bmicalculator",function(req,res){
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var bmi = (weight / height * height);
    console.log(req.body);
    res.send("The BMI ratio is " + bmi)
});


app.listen(5000, function(){
    console.log("Server started on port 3000");
});

