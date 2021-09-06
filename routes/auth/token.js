const tokenHandler = require("../../utils/tokenHenadler")

/**
 * Get new access token
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
    res.cookie('token', tokenHandler.issueNewRefreshToken(req.userData), {httpOnly: true})
        .status(200).send({
        accessToken: tokenHandler.issueNewAccessToken(req.userData)
    })
}