const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const app = express();
const api = require("./api.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());
app.use('/api', api);

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})