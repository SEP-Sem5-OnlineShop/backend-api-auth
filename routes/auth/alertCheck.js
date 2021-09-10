const User = require("../../models/alert")

/**
 * Router middleware for register
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports = async (req, res) => {
    const user = await User.createAlert()
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