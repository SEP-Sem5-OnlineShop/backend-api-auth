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
                firstName: data.firstName,
                lastName: data.lastName,
                telephone: data.telephone,
                role: data.role,
                location: data.location,
                password: hashPassword
        });
}

// get a user by telephone
module.exports.getUserByTelephone = (telephone) => {
        return User.findOne({telephone: telephone})
}

// get a user by email
module.exports.getUserByEmail = (email) => {
        console.log(email)
        return User.findOne({email: email})
}

// get users

// update user

// reset password
module.exports.resetPassword = async (email) => {
        return await User.findOne({email: email})
}

// create password
module.exports.createPassword = async (userId, hashedPassword) => {
        return await User.updateOne({_id: userId}, {password: hashedPassword})
}

// delete user