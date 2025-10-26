  const {
    Schema,
    model
  } = require("mongoose");
  
  const productSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
        type: Number,
        required: true
      },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const productModel = model("Product", productSchema)
  
  module.exports = productModel