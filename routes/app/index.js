const router = require("express").Router()
const admin = require("./admin/index")
const vendor = require("./vendor/index")
const vendorRequests = require("./vendor-requests/index")
const tokenHandler = require("../../utils/tokenHenadler")
const customerRouter = require("./customer/index")

router.get('/test', tokenHandler.verifyAccessToken, (req,res) => {
    return res.status(200).send('You are in the test route')
})

router.use('/app',[admin, vendor, vendorRequests, customerRouter])

module.exports = router