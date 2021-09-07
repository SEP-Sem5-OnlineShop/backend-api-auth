const router = require("express").Router()

const tokenHandler = require("../../utils/tokenHenadler");
const productRouter = require("./productRouter")

router.use('/products', productRouter);

router.get('/test', tokenHandler.verifyAccessToken, (req,res) => {
    res.status(200).send('You are in the test route')
})

module.exports = router