/**
 * Logout from the system
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports = (req, res) => {
    res.status(202).send({message: 'Successfully Logged out!'})
}