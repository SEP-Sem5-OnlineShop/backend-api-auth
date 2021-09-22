const router = require("express").Router()
const VendorController = require("../../../controllers/vendor")
const VendorRequestController = require("../../../controllers/vendorRequests")

router.get('/vendors', VendorController.getVendors)
router.get('/vendorRequests', VendorRequestController.getRequests)
router.post('/vendor/request', VendorRequestController.create)
router.put('/vendor/request/:id', VendorRequestController.update)
router.get('/vendor/request/:id', VendorRequestController.getRequest)

module.exports = router