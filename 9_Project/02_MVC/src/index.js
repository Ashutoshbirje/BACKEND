// Mehtod 1 
/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import dotenv from "dotenv";

const app =  express();
dotenv.config();

(async ()=>{
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    app.on("error",(error)=>{
        console.log("ERROR", error);
        throw error;
    })
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running at PORT ${process.env.PORT}`);
    })
  } catch (error) {
    console.error("ERROR: ", error)
    throw error;
  }
})();
*/

// Method 2
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js"; 

const PORT = process.env.PORT || 8000
dotenv.config();

connectDB()
.then(()=>{
  app.listen(PORT, ()=>{
    console.log(`Server is running at PORT : ${PORT}`);
  })
})
.catch((error)=>{
 console.log("Error: ", error);
});