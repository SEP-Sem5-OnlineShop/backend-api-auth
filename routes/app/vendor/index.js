const router = require("express").Router()
const VendorController = require("../../../controllers/vendor")

router.get('/vendors', VendorController.getVendors)

module.exports = router