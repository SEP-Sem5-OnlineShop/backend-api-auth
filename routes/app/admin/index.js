const router = require("express").Router()
const VendorController = require("../../../controllers/vendor")
const VendorRequestController = require("../../../controllers/vendorRequests")

router.get('/admin/vendors', VendorController.getVendors)
router.get('/admin/vendorRequests', VendorRequestController.getRequests)

module.exports = router