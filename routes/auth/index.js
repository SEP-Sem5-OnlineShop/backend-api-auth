const router = require("express").Router()

const validator = require("../../middlewares/validator")
const tokenHandler = require("../../utils/tokenHenadler")

const register = require("./register")
const login = require("./login")

router.post('/login', login)
router.post('/register', validator.userSchemaValidator, register)
router.post('/token', tokenHandler.verifyRefreshToken,
    (req, res) => {
    res.status(200).send(tokenHandler.issueTokens(req.userData))
})

module.exports = router