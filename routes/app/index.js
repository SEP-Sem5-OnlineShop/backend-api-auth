const router = require("express").Router()
const admin = require("./admin/index")
const vendor = require("./vendor/index")
const vendorRequests = require("./vendor-requests/index")
const product = require("./product")
const driverRouter = require("./driver")
const tokenHandler = require("../../utils/tokenHenadler")
const customerRouter = require("./customer/index")
const DriverController = require("../../controllers/driver")

router.get('/test', tokenHandler.verifyAccessToken, (req,res) => {
    return res.status(200).send('You are in the test route')
})

// router.use('/app',tokenHandler.verifyAccessToken, [admin, vendor, vendorRequests, product, customerRouter, driverRouter])
router.post('/driver/create_password', DriverController.createPassword)

///////////////////////////////
router.use('/app',[admin, vendor, vendorRequests])
/////////////////////////////

module.exports = router