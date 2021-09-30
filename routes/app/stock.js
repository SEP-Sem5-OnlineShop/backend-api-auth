const router = require("express").Router()

const StockController = require("../../controllers/stockController")

router.post('/daily-stock', StockController.create)
router.put('/daily-stock', StockController.update)
router.get('/daily-stock', StockController.get)

module.exports = router