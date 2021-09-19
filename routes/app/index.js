const router = require("express").Router()
const VendorRequestController = require("../../controllers/vendorRequests")
const admin=require("./admin/index")
const tokenHandler = require("../../utils/tokenHenadler")

router.get('/test', tokenHandler.verifyAccessToken, (req,res) => {
    res.status(200).send('You are in the test route')
})
router.post('/vendor/request', VendorRequestController.create)

router.use('/app',[admin])

module.exports = router