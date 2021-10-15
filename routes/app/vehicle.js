const router = require("express").Router()
const vehicleController = require("../../controllers/vehicle")

router.post('/vehicle', vehicleController.createSingle)
router.put('/vehicle/:id', vehicleController.update)
router.get('/vehicle/:id', vehicleController.get)
router.get('/vehicles', vehicleController.getList)
router.delete('/vehicle/:id', vehicleController.delete)

module.exports = router