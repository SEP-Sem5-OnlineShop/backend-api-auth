const router = require("express").Router()
const ProductController = require("../../controllers/product")
const tokenHandler = require("../../utils/tokenHenadler")

router.post('/product', ProductController.create)
router.put('/product/:id', ProductController.update)
router.get('/products', tokenHandler.verifyAccessToken, ProductController.getList)
router.get('/product/:id', ProductController.getProduct)

module.exports = router