const DriverController = require("../../controllers/driver")
const router = require("express").Router()
const tokenHandler = require('../../utils/tokenHenadler')

router.post('/driver', DriverController.create)
router.put('/driver', DriverController.update)
router.get('/driver/image', DriverController.getImage)
router.put('/driver/image', DriverController.updateImage)

module.exports = router