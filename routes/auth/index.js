const router = require("express").Router()

const validator = require("../../middlewares/validator")
const tokenHandler = require("../../utils/tokenHenadler")

const register = require("./register")
const login = require("./login")
const logout = require("./logout")
const token = require("./token")

router.post('/login', login)
router.post('/register', validator.userSchemaValidator, register)
router.get('/token', tokenHandler.verifyRefreshToken, token)
router.get('/logout', tokenHandler.verifyAccessToken, tokenHandler.removeRefreshToken, logout)

module.exports = router