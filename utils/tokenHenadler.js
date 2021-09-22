const randomBytes = require('crypto').randomBytes
const jwt = require('jsonwebtoken')

const defaultAccessSecret = 'access'
const defaultRefreshSecret = 'refresh'

require("dotenv").config()

// add a persistent token store like redis here
const refreshTokenStore = []

/**
 * Returns a new access token
 * @param payload
 * @returns {*}
 */
const issueNewAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET_ACCESS,
        {expiresIn: process.env.JWT_EXP_TIME_ACCESS}
    )
}

module.exports.issueNewAccessToken = issueNewAccessToken

/**
 * Returns a new refresh token
 * @param payload
 * @returns {*}
 */
const issueNewRefreshToken = (payload) => {
    const refreshToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_REFRESH,
        {expiresIn: process.env.JWT_EXP_TIME_REFRESH}
    )

    const storedRefreshToken = refreshTokenStore.find(item => item.telephone === payload.telephone)
    // if token is not in the store for that telephone number, add it to the store
    if(!storedRefreshToken)
        refreshTokenStore.push({
            telephone: payload.telephone,
            token: refreshToken
        })
    // if the token is already in the store for that telephone, just update it
    else storedRefreshToken.token = refreshToken
    return refreshToken
}
module.exports.issueNewRefreshToken = issueNewRefreshToken
/**
 * Returns a object with both refresh and access tokens
 * @param payload
 */
module.exports.issueTokens = (payload) => {
    const accessToken = issueNewAccessToken(payload)
    const refreshToken = issueNewRefreshToken(payload)
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

/**
 * Verify the access token in here
 * @param req
 * @param res
 * @param next
 */
module.exports.verifyAccessToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if(authorizationHeader) {
            const token = authorizationHeader.split(' ')[1]
            if(token)
            {
                req.userData = jwt.verify(token, process.env.JWT_SECRET_ACCESS)
                next()
            }
            return res.status(401).send({message: "Must login first!"})
        }
        return res.status(401).send({message: "Must login first!"})
    }
    catch (error) {
        res.status(401).send({message: "Session is invalid!"})
    }
}

/**
 * Verify the refresh token in here
 * @param req
 * @param res
 * @param next
 */
module.exports.verifyRefreshToken = (req, res, next) => {
    try {
        const token = req.cookies.token
        if(token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH || defaultRefreshSecret)
            req.userData = {
                userId: decoded.userId,
                telephone: decoded.telephone,
                role: decoded.role
            }
            // look for the token in the refreshTokenStore
            const storedRefreshToken = refreshTokenStore.find(item => item.token === token)
            if(!storedRefreshToken) return res.status(401).send({message: "Token is invalid!"})
            next()
        }
        else return res.status(401).send({message: "Token is invalid!"})
    }
    catch (error) {
        res.status(401).send({message: "Token Expired!"})
    }
}

module.exports.removeRefreshToken = (req, res, next) => {
    const token = req.cookies.token
    if(token) {
        const storedRefreshToken = refreshTokenStore.find(item => item.token === token)
        storedRefreshToken.token = ''
    }
    else return res.status(401).send({message: "Token is invalid!"})
    next()
}