const DriverController = require("../../controllers/driver")
const VehicleController = require("../../controllers/vehicle")
const AlertController = require("../../controllers/alertController")
const router = require("express").Router()
const tokenHandler = require('../../utils/tokenHenadler')

router.post('/driver', DriverController.create)
router.put('/driver', DriverController.update)
router.get('/drivers', DriverController.getDrivers)
router.get('/drivers-nearby', DriverController.getDriversNearby)
router.get('/driver/:id', DriverController.getDriver)
router.get('/drivers/:id', DriverController.getLoggedDriverList)
router.get('/vehicles', VehicleController.getList)
router.get('/driver/:driver_id/alerts', AlertController.getDriverAlerts)
router.get('/driver/image', DriverController.getImage)
router.put('/driver/image', DriverController.updateImage)
router.put('/driver/remove-vehicle/:id', DriverController.removeVehicle)

module.exports = router