const router = require("express").Router()
const AlertController = require("../../../controllers/alertController")
const ProductController = require("../../../controllers/product")
const VendorController = require("../../../controllers/vendor")

router.get('/customer/products/:vendor_id', ProductController.getVendorProductList)
router.get('/customer/product/:id', ProductController.getProduct)
router.get('/customer/vendors/:id', VendorController.getVendor)
router.get('/customer/alerts/:customer_id', AlertController.getCustomerAlertList)
// router.get('/customer/orders/:customer_id', OrderController.getCustomerOrderList)

module.exports = router
