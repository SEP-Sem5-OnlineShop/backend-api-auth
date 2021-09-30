const router = require("express").Router();
const AlertController = require("../../../controllers/alertController");
const ProductController = require("../../../controllers/product");
const PurchaseController = require("../../../controllers/purchaseController");
const VendorController = require("../../../controllers/vendor");

router.get('/customer/products/:vendor_id', ProductController.getVendorProductList);
router.get('/customer/product/:id', ProductController.getProduct);
router.get('/customer/vendors/:id', VendorController.getVendorDetailsForCustomer);
router.get('/customer/vendorlist', VendorController.getVendorListForCustomer);
router.get('/customer/:customer_id/alerts/:product_id', AlertController.getdetailsAlert);
router.get('/customer/alerts/:customer_id', AlertController.getCustomerAlertList);
router.post('/customer/:customer_id/alerts/:product_id', AlertController.setAlert);
router.delete('/customer/:customer_id/alerts/:product_id', AlertController.removeAlert);
router.post('/customer/purchase/:vendor_id', PurchaseController.createPurchase);
router.put('/customer/purchase/pay/:order_id', PurchaseController.payPurchase);
router.get('/customer/purchase/:purchase_id', PurchaseController.getPurchase);
router.get('/customer/purchases/:customer_id', PurchaseController.getCustomerPurchaseList);
router.put('/customer/purchases/:purchase_id/product/:product_id', PurchaseController.addReview);
router.get('/customer/products/sell/:vendor_id', ProductController.getVendorSellProductList);

module.exports = router;
