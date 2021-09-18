const VendorRequest = require('../models/vendorRequest')
const VendorRequestController = {
    create: async function(req, res, next) {
        try {
            const vendorRequest = VendorRequest.createRequest(req.body)
            await vendorRequest.save()
            return res.status(201).send(
                {
                    message: "Request was sent successfully!",
                }
            )
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