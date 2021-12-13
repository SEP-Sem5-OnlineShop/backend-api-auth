const User = require("../../models/user")

/**
 * Router middleware for register
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports = async (req, res) => {
    try {
        const userByTelephone = await User.getUserByTelephone(req.body.telephone)
        if(!userByTelephone) {
            const user = await User.createUser(req.body)
            await user.save()
            return res.status(201).send({
                message: "Successful",
                data: {
                    user:user,
                    message: "User creation is successful!"
                }
            })
        }
        return res.status(400).send({
            message: "Failed",
            data:"Given telephone number is already registered!"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Failed",
            data: "Something went wrong!"
        })
    }

}