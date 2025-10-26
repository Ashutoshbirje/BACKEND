const express = require("express")
const router = express.Router();

const User = require("../models/userModel")

// routes 

// CRUD operation 

// Read

router.get('/users', async(req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } 
    catch(err) {
        res.status(500).json({success:false,message: err.message})
    }
})  

// Create 

router.post('/users', async(req,res) => {
    console.log("Received");
    try {
        const {name,age,weight} = req.body;
        // create 
        const newuser = new User({name,age,weight}) 
        // save 
        await newuser.save();
        res.status(200).json({success:true,user:newuser});
    } 
    catch(err) {
        res.status(500).json({success:false,message: err.message})
    }
})  

// Update

router.put('/users/:id', async(req,res) => {
    const {id} = req.params;
    const {name,age,weight} = req.body;

    try {
        const updateduser = await User.findByIdAndUpdate(id,{name,age,weight})
      
        if(!updateduser){
           res.json({
             message: "User Not Found"
           })
        }
  
        res.status(200).json({success:true,user:updateduser});
    } 
    catch(err) {
        res.status(500).json({success:false,message: err.message})
    }
})  

// Delete 
router.delete('/users/:id', async(req,res) => {
    const {id} = req.params;
    const {name,age,weight} = req.body;

    try {
        const deleteduser = await User.findByIdAndDelete(id);
      
        if(!deleteduser){
           res.json({
             message: "User Not Found"
           })
        }
        // user found 
        res.status(200).json({success:true,user:deleteduser});
    } 
    catch(err) {
        res.status(500).json({success:false,message: err.message})
    }
})  

module.exports = router;