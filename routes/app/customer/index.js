const router = require("express").Router();
const AlertController = require("../../../controllers/alertController");
const ProductController = require("../../../controllers/product");
const PurchaseController = require("../../../controllers/purchaseController");
const VendorController = require("../../../controllers/vendor");

router.get('/customer/products/:vendor_id', ProductController.getVendorProductList);
router.get('/customer/product/:id', ProductController.getProduct);
router.get('/customer/vendors/:id', VendorController.getVendorDetailsForCustomer);
router.get('/customer/:customer_id/alerts/:product_id', AlertController.getdetailsAlert);
router.get('/customer/alerts/:customer_id', AlertController.getCustomerAlertList);
router.post('/customer/:customer_id/alerts/:product_id', AlertController.setAlert);
router.delete('/customer/:customer_id/alerts/:product_id', AlertController.removeAlert);
router.post('/customer/purchase/', PurchaseController.createPurchase);
router.get('/customer/purchase/:purchase_id', PurchaseController.getPurchase);
// router.get('/customer/orders/:customer_id', OrderController.getCustomerOrderList);
module.exports = router;
