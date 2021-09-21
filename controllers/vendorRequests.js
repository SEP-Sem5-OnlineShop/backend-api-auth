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
    getRequest:async function(req, res, next) {
        console.log(req.params)
        const request = await VendorRequest.getRequest(req.params.id)
        res.status(200).send({data: request})
    },
    getRequests:async function(req, res, next) {
        const requests=await VendorRequest.getRequests()
        res.status(200).send({data : requests})
    },

    update: function(req, res, next) {

    }
}

module.exports = VendorRequestController