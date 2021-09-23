const router = require("express").Router()
const VendorController = require("../../../controllers/vendor")
const VendorRequestController = require("../../../controllers/vendorRequests")
const productController = require("../../../controllers/product")
const adminController = require("../../../controllers/admin")

router.get('/admin/vendors', VendorController.getVendors)
router.get('/admin/vendorRequests', VendorRequestController.getRequests)
router.get('/admin/vendor/:id', VendorController.getVendor)
router.get('/admin/Products/:id', productController.getProducts)
router.get('/admin/singleProduct/:id', productController.getProduct)
router.get('/vendor/register/:id', VendorRequestController.getRequest)
router.get('/admin', productController.getMaxProducts)

router.get('/admin', productController.getMaxProducts)
router.post('/admin/createVendor', VendorController.createVendor)
router.put('/admin/singleVendor/:id', VendorController.removeVendor)
router.put('/admin/updateStatus', VendorRequestController.updateStatus)
router.get('/admin/adminProfile/:id', adminController.getAdmin)

module.exports = router