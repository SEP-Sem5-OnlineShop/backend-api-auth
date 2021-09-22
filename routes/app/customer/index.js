const router = require("express").Router()
const ProductController = require("../../../controllers/product")

router.get('/customer/products/:id', ProductController.getVendorProductList)

module.exports = router
