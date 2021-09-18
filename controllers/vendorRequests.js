const VendorRequest = require('../models/vendorRequest')
const VendorRequestController = {
    create: async function(req, res, next) {
        try {
            await VendorRequest.createRequest(req.body)
            res.status(200).send({message: "success"})
        }
        catch(e) {

        }
    },
    getRequest: function(req, res, next) {

    },
    getRequests: function(req, res, next) {

    },
    update: function(req, res, next) {

    }
}

module.exports = VendorRequestController