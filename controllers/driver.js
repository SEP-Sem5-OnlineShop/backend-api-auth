const Driver = require('../models/driver')
const User = require('../models/user')

const DriverController = {
    create: async (req, res, next) => {
        try {
            const userByTelephone = await User.getUserByTelephone(req.body.telephone)
            const userByEmail = await User.getUserByEmail(req.body.email)
            if (!userByTelephone) {
                if (userByEmail===null) {
                    await Driver.createDriver(req.userData.userId, req.body)
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

    update: async function (req, res, next) {
    },

    getDriver: async function (req, res, next) {
    },

    getDrivers: async function (req, res, next) {
    },

    delete: async function (req, res, next) {
    }

}

module.exports = DriverController