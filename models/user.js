const bcrypt = require("bcrypt")

const User = require("../database/schemas/userSchema")

/**
 * Create a user
 * @param data
 */
module.exports.createUser = async (data) => {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(data.password, salt)
        return new User({
                fName: data.fName,
                lName: data.lName,
                telephone: data.telephone,
                role: data.role,
                location: data.location,
                password: hashPassword
        });
}

// get a user
module.exports.getUser = (telephone) => {
        return User.findOne({telephone: telephone})
}

// get users

// update user

// delete user