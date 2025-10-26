const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){
    // console.log("Post request recieved");
const apikey = "4d106fbf380cb29497c88eec926d0b7e";
const query = req.body.cityName;
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units"+unit

https.get(url,function(response){
    console.log(response);
    console.log(response.statusCode);
    response.on("data",function(data){
        // Give the data in heaxa decimal format
        // console.log(data);
        // Parsing (Hexa --> object)
        const weahterdata=JSON.parse(data);
        // console.log(weahterdata);
        // Parsing (object --> string)
        // const object = {
        //     name : "Ashu",
        //     language : "English"
        // }
        // console.log(object)
        // console.log(JSON.stringify(object))
        const temp = weahterdata.main.temp;
        const weahterdes = weahterdata.weather[0].description
        const icon = weahterdata.weather[0].icon
        const imgURL =  "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1>The temprature is currently " + weahterdes);
        res.write("<h1>The temprature in " + query + " is " + temp + "degrees Celcius</h1>");
        res.write("<img src="+imgURL+">");
        res.send();
        // Only one send is there
        // res.send("<h1>The temprature in London is " + temp + "degrees Celcius</h1>");
    })
})
// res.send("Server is running")
})

app.listen(port,function(){
    console.log("Server is running on the port 3000 ")
})
