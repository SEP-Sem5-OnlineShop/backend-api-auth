const bcrypt = require("bcrypt")

const User = require("../../models/user")
const tokenHandler = require("../../utils/tokenHenadler")

/**
 * Route middleware for login
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports = async (req, res) => {
    console.log('inside the login')
    const telephone = req.body.telephone
    console.log(telephone)
    const password = req.body.password
    console.log(password)
    const user = await User.getUserByTelephone(telephone)
    console.log(user.role)
    let tokens = ''
    if(user) {
        tokens = tokenHandler.issueTokens({
            userId: user['_id'],
            telephone: telephone,
            email: user['email'],
            role: user['role']
            
        })
        // console.log(role)
    }
    else return res.status(401).send({message: "User is not registered!"})

    // compare the password with hash password
    const isValid = await bcrypt.compare(password, user['password'])
    if(!isValid) return res.status(400).send({message: "Password is incorrect!"})
    delete user.password
    return res.cookie('token', tokens.refreshToken, {httpOnly: true}).status(200).send({
        message: "Success",
        data: user,
        accessToken: tokens.accessToken,
    })
}