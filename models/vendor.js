const Vendor = require("../database/schemas/userSchema")
const Product = require("../database/schemas/productSchema")
const bcrypt = require("bcrypt")
// get a vendor
module.exports.getVendor = (id) => {
    return Vendor.findOne({_id: id}) 
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


// remove user
module.exports.removeVendor = async (id) => {
    console.log('inside removeVendor');
    console.log(id);
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
    // const salt =await bcrypt.genSalt(10)
    // const hashPassword =await bcrypt.hash(data.password, salt)
    console.log("Inside")
    return new Vendor({
            firstName: data.fullName,
            lastName: data.nic,
            telephone: data.telephone,
            role: 'vendor',
            email:data.email,
            status:data.status,
            // password: hashPassword
            
    });
}

