const router = require("express").Router()

const admin = require("./admin/index")
const vendor = require("./vendor/index")
const vendorRequests = require("./vendor-requests/index")
const product = require("./product")
const driverRouter = require("./driver")
const dailyStockRouter = require("./stock")
const adminController = require("../../controllers/admin")
const customerRouter = require("./customer/index")
const vehicleRouter = require("./vehicle")

const user = require("../../controllers/user")
const DriverController = require("../../controllers/driver")

const tokenHandler = require("../../utils/tokenHenadler")

router.get('/test', tokenHandler.verifyAccessToken, (req,res) => {
    return res.status(200).send('You are in the test route')
})

router.use('/app',customerRouter)
router.use('/app', tokenHandler.verifyAccessToken, [
    admin,
    vendor,
    product,
    customerRouter,
    driverRouter,
    dailyStockRouter,
    vehicleRouter
])
router.use('/gen',customerRouter)
router.use('/update-password', tokenHandler.verifyAccessToken, user.forgetPassword)
router.post('/driver/create_password', DriverController.createPassword)
router.use('/general', [vendorRequests])
router.post('/admin/create_password', adminController.createPassword)
///////////////////////////////
router.use('/app',[admin, vendor, vendorRequests])
/////////////////////////////

module.exports = router