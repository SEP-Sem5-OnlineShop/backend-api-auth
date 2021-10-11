const router = require("express").Router()
const VendorController = require("../../../controllers/vendor")
const VendorRequestController = require("../../../controllers/vendorRequests")
const productController = require("../../../controllers/product")
const purchaseController = require("../../../controllers/purchaseController")
const adminController = require("../../../controllers/admin")
const login = require("../../auth/login")


router.get('/admin/vendors', VendorController.getVendors)
router.get('/admin/NumberOfVendors', VendorController.getNumberOfVendors)
router.get('/admin/getPurchaseCount', purchaseController.getPurchaseCount)
router.get('/admin/vendorRequests', VendorRequestController.getRequests)
router.get('/admin/vendor/:id', VendorController.getVendor)
router.get('/admin/Products/:id', productController.getProducts)
router.get('/admin/singleProduct/:id', productController.getProduct)
router.get('/vendor/register/:id', VendorRequestController.getRequest)
router.get('/admin', productController.getMaxProducts)

router.get('/admin', productController.getMaxProducts)
router.post('/admin/createVendor', VendorController.createVendor)
router.put('/admin/singleVendor/:id', VendorController.removeVendor)
router.put('/admin/updateStatus/:id', VendorRequestController.updateStatus)
router.put('/admin/rejectRequest/:id', VendorRequestController.rejectRequest)
router.get('/admin/adminProfile/:id', adminController.getAdmin)
router.post('/admin/createAdmin', adminController.createAdmin)
router.post('/admin/create_password/:token', adminController.createPassword)




router.post('/login', login)

module.exports = router