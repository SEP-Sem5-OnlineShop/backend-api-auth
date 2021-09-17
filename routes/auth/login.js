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
    const telephone = req.body.telephone
    const password = req.body.password
    const user = await User.getUser(telephone)
    let tokens = ''
    if(user) {
        tokens = tokenHandler.issueTokens({
            userId: user['_id'],
            telephone: telephone,
            role: user['role']
        })
    }
    else return res.status(401).send({message: "User is not registered!"})

    // compare the password with hash password
    const isValid = await bcrypt.compare(password, user['password'])
    if(!isValid) return res.status(400).send({message: "Password is incorrect!"})

    return res.cookie('token', tokens.refreshToken, {httpOnly: true}).status(200).send({
        message: "Login Successful!",
        data: user,
        accessToken: tokens.accessToken,
    })
}