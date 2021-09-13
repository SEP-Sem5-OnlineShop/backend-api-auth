/**
 * Logout from the system
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
    await res.clearCookie('token').status(202).send({message: 'Successfully Logged out!'})
}