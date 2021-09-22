const router = require("express").Router()
const VendorRequestController = require("../../controllers/vendorRequests")

const admin = require("./admin/index")
const vendor = require("./vendor/index")

const tokenHandler = require("../../utils/tokenHenadler")

router.get('/test', tokenHandler.verifyAccessToken, (req,res) => {
    return res.status(200).send('You are in the test route')
})

router.use('/app',[admin, vendor])

module.exports = router