const router = require("express").Router()
const VendorController = require("../../../controllers/vendor")
const VendorRequestController = require("../../../controllers/vendorRequests")
const productController = require("../../../controllers/product")

router.get('/admin/vendors', VendorController.getVendors)
router.get('/admin/vendorRequests', VendorRequestController.getRequests)
router.get('/admin/vendor/:id', VendorController.getVendor)
router.get('/admin/Products/:id', productController.getProducts)

module.exports = router