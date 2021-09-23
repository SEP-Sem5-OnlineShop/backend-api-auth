const Admin = require("../database/schemas/userSchema")
const bcrypt = require("bcrypt")
// get a vendor
module.exports.getAdmin = (id) => {
    return Admin.findOne({_id: '614cbc3a21345c9ab6805117'}).select('-password')
    // return Product.find({_id: id})
}


