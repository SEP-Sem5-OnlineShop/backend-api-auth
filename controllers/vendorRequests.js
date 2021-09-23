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
            console.log(e)
            return res.status(400).send(e)
        }
    },

    update: async function(req, res, next) {
        try {
            const result = await VendorRequest.updateRequest(req.params.id, req.body)
            console.log(result)
            return res.status(200).send({
                message: "Successfully updated!"
            })
        }
        catch(e) {
            return res.status(400).send({message: "Something went wrong!"})
        }
    },

    getRequest:async function(req, res, next) {
        console.log(req.params)
        const request = await VendorRequest.getRequest(req.params.id)
        res.status(200).send({data: request})
    },

    getRequestByTelephoneNumber: async function(req, res, next) {
        const telephoneNumber = req.params.id
        try {
            const vendorRequest = await VendorRequest.getRequestByTelephoneNumber(telephoneNumber)
            return res.status(200).send(
                {
                    message: "Request was sent successfully!",
                    data: vendorRequest
                }
            )
        }
        catch(e) {
            console.log(e)
            return res.status(400).send(e)
        }
    },

    getRequests:async function(req, res, next) {
        const requests=await VendorRequest.getRequests()
        res.status(200).send({data : requests})
    },



    updateStatus:async function(req, res, next) {
        // console.log(req.params.id)
        try {
            const vendor = VendorRequest.updateStatus(req.params.id)
            // await vendor.save()
            return res.status(201).send(
                {
                    message: "Request was sent successfully!",
                }
            )
        }
        catch(e) {
            console.log(e)
            return res.send(e);
        }
        
    }

}

module.exports = VendorRequestController