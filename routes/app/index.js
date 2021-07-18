const router = require("express").Router()

const tokenHandler = require("../../utils/tokenHenadler")

router.get('/test', tokenHandler.verifyAccessToken, (req,res) => {
    res.status(200).send('You are in the test route')
})

module.exports = router