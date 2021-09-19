const Vendor = require("../database/schemas/userSchema")


// get a vendor
module.exports.getVendor = (id) => {
    return Vendor.findOne({_id: id})
}

// get vendors
module.exports.getVendors = async () => {
    return await Vendor.find({ "role":"customer" }).select("-password")
    // return Vendor.find({role: {$elemMatch :"vendor"}})
}


// update user

// delete user