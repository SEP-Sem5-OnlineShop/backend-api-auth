const Admin = require("../database/schemas/userSchema")
const User = require('../database/schemas/userSchema')
const bcrypt = require("bcrypt")
// get a vendor
module.exports.getAdmin = (id) => {
    // console.log(id)
    // return id
    const ad=Admin.findOne({_id: id}).select('-password')
    return ad
    // return Product.find({_id: id})
}

module.exports.updateAdmin = async (data) => {
    console.log(data)
    return Admin.updateOne({email: data.email}, {
        firstName: data.firstName,
        lastName: data.lastName,
        telephone: data.telephone,
        email: data.email,
        
    });
}

module.exports.createAdmin =async (data) => {
    // const salt = await bcrypt.genSalt(10)
    // const hashPassword = await bcrypt.hash(data.password, salt)
    return new Admin({
            firstName: data.firstName,
            lastName: data.lastName,
            telephone: data.telephone,
            role: 'admin',
            email:data.email,
            // password: hashPassword
            
    });
}

module.exports.createPassword = async (email, password) => {
    console.log("create password");
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        console.log("create password");
        await Admin.updateOne({email: email}, {password: hashPassword})
    }
    catch(e) {
        throw e
    }
}


