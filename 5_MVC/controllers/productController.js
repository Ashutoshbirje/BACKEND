const Product = require('../models/productModel')

// business logic 
const getProducts = async(req,res) => {
    try {
         const allProduct = await Product.find();

         if(allProduct.length === 0){
             res.json({
                message:"There is No Product"
             })
         } 
         res.status(200).json({
            success: true,
            products: allProduct
        })
    }
    catch (err){
        res.status(200).json({
            success: false,
            message: "Internal Server error "
        })
    }
}

const createProducts = async(req,res) => {
    try {
       const {name, price, description, category} = req.body;
       const newProduct = new Product({name, price, description, category});
       await newProduct.save();
       res.status(200).json({
           success: true,
           products: newProduct
       })
    }
    catch (err){
        res.status(200).json({
            success: false,
            message: "Internal Server error "
        })
    }
}

const updateProducts = async(req,res) => {
    try {
       const {id} = req.params;
       const {name, price, description, category} = req.body;
       const updateProduct = await Product.findByIdAndUpdate
       (id,{name, price, description, category},{new:true});

       if(!updateProduct){
        res.json({
            message: "cannot find products"
        })
       }
       res.status(200).json({
        success: true,
        products: updateProduct
      })
    }
    catch (err){
        res.status(200).json({
            success: false,
            message: "Internal Server error "
        })
    }
}

const deleteProducts = async(req,res) => {
    try {
        const {id} = req.params;
        const deleteduser = await Product.findByIdAndDelete(id);
      
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
}

module.exports = {getProducts,updateProducts,createProducts,deleteProducts}