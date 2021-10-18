const Driver = require('../models/driver')
const User = require('../models/user')
const { sendEmail } = require('../utils/email-service/configuration')
const { createJwtTokenForEmailVerifications, verifyEmailVerificationToken } = require('../utils/tokenHenadler')

const DriverController = {
    create: async (req, res, next) => {
        try {
            const userByTelephone = await User.getUserByTelephone(req.body.telephone)
            const userByEmail = await User.getUserByEmail(req.body.email)
            const token = createJwtTokenForEmailVerifications({ email: req.body.email })
            if (!userByTelephone) {
                if (!userByEmail) {
                    await Driver.createDriver(req.userData.userId, req.body)
                    await sendEmail({
                        subject: "Verify your account",
                        to: req.body.email || "",
                        from: process.env.EMAIL_SERVICE_ADDRESS,
                        html: `
                        <h4 style="color: #264A75">Hi ${req.body.firstName || ""} ${req.body.lastName || ""}</h4>
                        <div>We have created your driver account</div>
                        <div>Please use <a href="http://localhost:3000/create_password/${token}">this</a> link to activate your account.</div>
                        `
                    })
                    return res.status(201).send({
                        message: 'Driver is registered successfully!'
                    })
                }
                return res.status(400).send({
                    message: 'User is already registered using given email!'
                })
            }
            return res.status(400).send({
                message: 'User is already registered using give telephone number!'
            })

        }
        catch (e) {
            return res.status(400).send({
                message: e.message
            })
        }
    },

    createPassword: async function (req, res, next) {
        try {
            if (req.body.token) {
                const data = verifyEmailVerificationToken(req.body.token)
                if (data.email) {
                    await Driver.createPassword(data.email, req.body.password)
                    return res.status(200).send({
                        message: "Password is created successfully!"
                    })
                }
                return res.status(400).send({
                    message: "Token  is not valid!"
                })
            }
            return res.status(400).send({
                message: "Token  is empty!"
            })
        }
        catch (e) {
            console.log(e)
            return res.status(400).send({
                message: "Something went wrong!"
            })
        }
    },

    update: async function (req, res, next) {
        try {
            const result = await Driver.updateDriver(req.userData.userId, req.body)
            return res.status(200).send({
                message: "Success"
            })
        }
        catch(e) {
            return res.status(400).send({
                message: e.message
            })
        }
    },

    getDriver: async function (req, res, next) {
        try {
            const driver = await Driver.getDriver(req.params.id)
            return res.status(200).send({
                message: "Success",
                data: driver
            })
        }
        catch (e) {
            return res.status(400).send({
                message: "Failed",
                data: e.message
            })
        }
    },

    getLoggedDriverList: async function (req, res, next) {
        try {
            const drivers = await Driver.getLoggedDriverList(req.params.id)
            return res.status(200).send({
                message: "Success",
                data: drivers
            })
        }
        catch (e) {
            return res.status(400).send({
                message: "Failed",
                data: e.message
            })
        }
    },

    getDrivers: async function (req, res, next) {
        try {
            const result = await Driver.getDriversList(req.userData.userId)
            return res.status(200).send({
                message: "Success",
                data: result
            })
        }
        catch(e) {
            return res.status(400).send({
                message: e.message
            })
        }
    },

    getDriversNearby: async function (req, res, next) {
        try {
            const result = await Driver.getLoggedDriverListNearby(req.query)
            return res.status(200).send({
                message: "Success",
                data: result
            })
        }
        catch(e) {
            return res.status(400).send({
                message: e.message
            })
        }
    },

    getImage: async function (req, res, next) {
        try {
            const result = await User.getUserByEmail(req.userData.email)
            if(result) {
                return res.status(200).send({
                    message: "Success",
                    data: result[req.userData.role].imageUrl
                })
            }
        }
        catch (e) {
            return res.status(400).send({
                message: e.message
            })
        }
    },

    updateImage: async function (req,res,next) {
        try {
            const result = await Driver.updateImage(req.userData.userId, req.body.imageUrl)
            
            return res.status(200).send({
                message: "Success",
                data: "Your profile image is updated"
            })
        }
        catch (e) {
            return res.status(400).send({
                message: e.message
            })
        }
    },

    removeVehicle: async function (req, res, next) {
        try {
            await Driver.removeVehicle(req.params.id)
            return res.status(200).send({
                message: "Success",
                data: "Vehicle removed"
            })
        }
        catch (e) {
            return res.status(400).send({
                message: "Failed",
                data: e.message
            })
        }
    },

    delete: async function (req, res, next) {
    }

}

module.exports = DriverController