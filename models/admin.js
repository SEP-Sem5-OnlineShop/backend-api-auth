const Admin = require("../database/schemas/userSchema")
const bcrypt = require("bcrypt")
// get a vendor
module.exports.getAdmin = (id) => {
    return Admin.findOne({_id: '614f3b459a76f2287c9bf0eb'}).select('-password')
    // return Product.find({_id: id})
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
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await User.updateOne({email: email}, {password: hashPassword})
    }
    catch(e) {
        throw e
    }
}


