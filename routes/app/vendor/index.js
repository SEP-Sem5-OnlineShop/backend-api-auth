const router = require("express").Router()
const VendorController = require("../../../controllers/vendor")
const purchaseController = require("../../../controllers/purchaseController")

router.get('/vendors', VendorController.getVendors)
router.get('/vendor/purchases/:vendor_id', purchaseController.getVendorPurchaseList);
router.get('/vendor/product/:product_id', purchaseController.getProduct);

module.exports = router