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


// remove user
module.exports.removeVendor = async (id) => {
    console.log('inside removeVendor');
    console.log(id);
    // return Vendor.updateOne(filter: {_id: id}, update: {status:'rejected'});

    return Vendor.updateOne({_id: id}, 
        {'status':'rejected'}, function (err) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs  ");
        }
    });
    // return Vendor.find({role: {$elemMatch :"vendor"}})
}
// delete user

