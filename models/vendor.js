const Vendor = require("../database/schemas/userSchema")
const Product = require("../database/schemas/productSchema")

// get a vendor
module.exports.getVendor = (id) => {
    return Vendor.findOne({_id: id}) 
    // return Product.find({_id: id})
}

// get vendors
module.exports.getVendors = async () => {
    return await Vendor.find({ "role":"vendor" }).select("-password")
    // return Vendor.find({role: {$elemMatch :"vendor"}})
}


// update user

// delete user

