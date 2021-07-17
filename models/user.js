const User = require("../database/schemas/userSchema")

/**
 * Create a user
 * @param data
 */
module.exports.createUser = (data) => {
        return new User({
                _id: data._id,
                fName: data.fName,
                lName: data.lName,
                telephone: data.telephone,
                role: data.role,
                location: data.location,
                email: data.email
        });
}

// get a user

// get users

// update user

// delete user