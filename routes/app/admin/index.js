const router = require("express").Router()
const VendorController = require("../../../controllers/vendor")
const VendorRequestController = require("../../../controllers/vendorRequests")
const productController = require("../../../controllers/product")
const purchaseController = require("../../../controllers/purchaseController")
const adminController = require("../../../controllers/admin")
const userController = require("../../../controllers/user")
const login = require("../../auth/login")


router.get('/admin/vendors', VendorController.getVendors)
router.get('/admin/NumberOfVendors', VendorController.getNumberOfVendors)
router.get('/admin/getPurchaseCount', purchaseController.getPurchaseCount)
router.get('/admin/getLastPurchaseDay1', purchaseController.getLastPurchaseDay1)
router.get('/admin/getLastPurchaseDay2', purchaseController.getLastPurchaseDay2)
router.get('/admin/getLastPurchaseDay3', purchaseController.getLastPurchaseDay3)
router.get('/admin/getLastPurchaseDay4', purchaseController.getLastPurchaseDay4)
router.get('/admin/getLastPurchaseDay5', purchaseController.getLastPurchaseDay5)
router.get('/admin/vendorRequests', VendorRequestController.getRequests)
router.get('/admin/vendor/:id', VendorController.getVendor)
router.get('/admin/Products/:id', productController.getProducts)
router.get('/admin/singleProduct/:id', productController.getProduct)
router.get('/vendor/register/:id', VendorRequestController.getRequest)
router.get('/admin', productController.getMaxProducts)
router.get('/admin', productController.getMaxProducts)
router.get('/admin/adminProfile/:id', adminController.getAdmin)

router.post('/admin/createVendor', VendorController.createVendor)
router.post('/admin/createAdmin', adminController.createAdmin)
router.post('/admin/create_password/:token', adminController.createPassword)
router.post('/login', login)

router.put('/admin/singleVendor/:id', VendorController.removeVendor)
router.put('/admin/updateStatus/:id', VendorRequestController.updateStatus)
router.put('/admin/updateAdmin', adminController.updateAdmin)
router.put('/admin/rejectRequest/:id', VendorRequestController.rejectRequest)



module.exports = router