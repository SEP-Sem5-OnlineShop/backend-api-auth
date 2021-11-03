const Vendor = require("../database/schemas/userSchema")
const Product = require("../database/schemas/productSchema")
const bcrypt = require("bcrypt")
const { datacatalog_v1 } = require("googleapis")
// get a vendor
module.exports.getVendor = (id) => {
    return Vendor.findOne({_id: id}).select("-password") 
    // return Product.find({_id: id})
}

// get vendors
module.exports.getVendors = async () => {
    return Vendor.find({"role": "vendor"}).select("-password");
    // return Vendor.find({role: {$elemMatch :"vendor"}})
}

module.exports.getEmail = (id) => {
    return Vendor.findOne({_id: id},'email').exec()
    // return Product.find({_id: id})
}

module.exports.getNumberOfVendors =async () => {
    // const count = await Vendor.count({ "role": "vendor" });
    // console.log (count);
    return await Vendor.countDocuments({ "role": "vendor" }).exec();
    // return Product.find({_id: id})
}


// remove user
module.exports.removeVendor = async (id) => {
    // console.log('inside removeVendor');
    // console.log(id);
    // return Vendor.updateOne(filter: {_id: id}, update: {status:'rejected'});

    return Vendor.updateOne({_id: id}, 
        {'vendor.status':'rejected'}, function (err) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs  ");
        }
    });
    // return Vendor.find({role: {$elemMatch :"vendor"}})
}


/**
 * Create a user
 * @param data
 */
 module.exports.createVendor =async (data) => {
    // console.log("Inside")
    // console.log(data)
    return  new Vendor(data);
}

module.exports.addRating = async (vendor_id,rating) => {
    const user = await module.exports.getVendor(vendor_id);
    const newNumReviews = user.vendor.numReviews + 1;
    const newRating = (user.vendor.rating*user.vendor.numReviews + rating)/ newNumReviews ;
    return Vendor.findOneAndUpdate(
        { _id: vendor_id},
        { vendor:{
            rating: newRating,
            numReviews: newNumReviews
            }
        },
        {useFindAndModify: false},
    );
}