const router = require("express").Router()
const VendorRequestController = require("../../controllers/vendorRequests")

const tokenHandler = require("../../utils/tokenHenadler")

router.get('/test', tokenHandler.verifyAccessToken, (req,res) => {
    res.status(200).send('You are in the test route')
})
router.post('/vendor/request', VendorRequestController.create)

module.exports = router