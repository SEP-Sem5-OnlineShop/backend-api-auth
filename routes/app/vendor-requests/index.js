const router = require("express").Router()
const VendorRequestController = require("../../../controllers/vendorRequests")

router.get('/vendorRequests', VendorRequestController.getRequests)
router.post('/vendor/request', VendorRequestController.create)
router.put('/vendor/request', VendorRequestController.update)
router.get('/vendor/request/:id', VendorRequestController.getRequestUsingToken)
router.post('/vendor/request/verify', VendorRequestController.verifyRequestByTelephoneNumber)

module.exports = router