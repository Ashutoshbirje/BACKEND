const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;
const app = express();

// to serve static file for server

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var emailName = req.body.email;

    // You can handle the received data here
    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("Email: " + emailName);

    res.send("Data received successfully!");
});


app.listen(port,function(){
    console.log("Server is running on the port 3000 ")
})
