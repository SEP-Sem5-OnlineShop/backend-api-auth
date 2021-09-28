const User = require("../models/user")
const { sendEmail } = require("../utils/email-service/configuration")
const { createJwtTokenForResetPassword, verifyResetPasswordToken } = require('../utils/tokenHenadler')
const bcrypt = require('bcrypt')
const { response } = require("express")

module.exports = {
    resetPassword: async (req, res, next) => {
        try {
            const user = await User.getUserByEmail(req.body.email)
            if (user) {
                const token = createJwtTokenForResetPassword({ userId: user._id })
                await sendEmail({
                    subject: "Reset your Password",
                    to: req.body.email || "",
                    from: process.env.EMAIL_SERVICE_ADDRESS,
                    html: `
                    <div>Please use <a href="http://localhost:3000/create_password/${token}">this</a> link to reset your password</div>
                    `
                })
                return res.status(200).send({
                    message: "Success"
                })
            }
        }
        catch (e) {
            res.status(400).send({
                message: "Check your internet connection!"
            })
        }
    },
    createPassword: async (req, res, next) => {
        try {
            const data = await verifyResetPasswordToken(req.body.token)
            if (data) {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(req.body.password, salt)
                await User.createPassword(data.userId, hashPassword)
                return res.status(200).send({
                    message: "Password resetting is successful"
                })
            }
        }
        catch (e) {
            console.log(e)
            return res.status(400).send({
                message: "The token is invalid!"
            })
        }
    },
    forgetPassword: async (req, res, next) => {
        try {
            const user = await User.getUserByEmail(req.userData.email)
            if (user) {
                const isValid = await bcrypt.compare(req.body.currentPassword, user['password'])
                if (isValid) {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(req.body.newPassword, salt)
                    const result = await User.updatePassword(req.userData.userId, hashPassword)
                    if(result && result.nModified) {
                        return res.status(200).send({
                            message: "Success",
                            data: "Password update successful!"
                        })
                    }
                }
                return res.status(400).send({
                    message: "Failed",
                    data: "Your current password is not matched with the actual password!"
                })
            }
            return res.status(400).send({
                message: "Failed",
                data: "No valid user!"
            })
        }
        catch (e) {
            return res.status(400).send({
                message: "Failed",
                data: e.message
            })
        }
    }
}