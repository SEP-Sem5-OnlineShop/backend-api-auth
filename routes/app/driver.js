const DriverController = require("../../controllers/driver")
const router = require("express").Router()
const tokenHandler = require('../../utils/tokenHenadler')

router.post('/driver', DriverController.create)

module.exports = router