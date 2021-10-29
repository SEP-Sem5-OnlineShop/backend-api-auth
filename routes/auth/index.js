const router = require("express").Router()

const validator = require("../../middlewares/validator")
const tokenHandler = require("../../utils/tokenHenadler")
const UserController = require("../../controllers/user")

const register = require("./register")
const login = require("./login")
const logout = require("./logout")
const token = require("./token")
const loginAdmin = require("./login-admin")

router.post('/login', login)
router.post('/login-admin', loginAdmin)
router.post('/register', validator.userSchemaValidator, register)
router.get('/token', tokenHandler.verifyRefreshToken, token)
router.get('/logout', tokenHandler.verifyAccessToken,tokenHandler.removeRefreshToken, logout)
router.post('/reset_password', UserController.resetPassword)
router.post('/create_Password', UserController.createPassword)

module.exports = router