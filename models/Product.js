const Product = require("../database/schemas/productSchema")
const mongoose = require("mongoose")

// get a product
module.exports.getProduct = (id) => {
    return Product.findOne({_id: id}) 
    // return Product.find({_id: id})
}

// get vendors
module.exports.getProducts = async (id) => {
    // var ObjectId=require('mongoose').Types.ObjectId;
    // return await Product.find({})
   
    return await Product.find({seller:id})
    // return Vendor.find({role: {$elemMatch :"vendor"}})
}

//get max ratings
module.exports.getMaxProducts = async () =>{
    return await Product.find({}).sort({"rating":-1}).limit(5)
}


// update user

// delete user

