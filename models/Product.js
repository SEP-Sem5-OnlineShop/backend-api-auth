const Product = require("../database/schemas/productSchema")
const mongoose = require("mongoose")

// get a vendor
// module.exports.getVendor = (id) => {
//     return Vendor.findOne({_id: id})
// }

// get vendors
module.exports.getProducts = async (id) => {
    // var ObjectId=require('mongoose').Types.ObjectId;
    // return await Product.find({})
   
    return await Product.find({seller:id})
    // return Vendor.find({role: {$elemMatch :"vendor"}})
}


// update user

// delete user

