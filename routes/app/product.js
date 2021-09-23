const router = require("express").Router()
const ProductController = require("../../controllers/product")

router.post('/product', ProductController.create)
router.put('/product/:id', ProductController.update)
router.get('/products', ProductController.getList)
router.get('/product/:id', ProductController.getProduct)

module.exports = router