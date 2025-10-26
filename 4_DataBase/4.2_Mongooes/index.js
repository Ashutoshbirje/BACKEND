const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv')
const users = require('./routes/users');
const app = express();

// load any configuration
dotenv.config()

// Middleware to parse JSON requests
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api', users);
// --> /api/users

app.get('/',(req,res)=>{
  console.log("I am inside home page route handler");
  res.send("Hello Sir, Welcome to Home page");
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on 3000")
})
