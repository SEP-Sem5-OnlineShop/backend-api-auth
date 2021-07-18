const User = require("../../models/user")

/**
 * Router middleware for register
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports = async (req, res) => {
    const user = await User.createUser(req.body)
    try {
        res.status(201).send({
            message: "User creation is successful!",
            data:await user.save()
        })
    }
    catch (error) {
        return res.status(400).send({
            message: "Bad Request!",
            error: error
        })
    }

}