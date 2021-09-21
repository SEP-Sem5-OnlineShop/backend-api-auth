const Vendor = require('../models/vendor')


const VendorController = {
    create: function(req, res, next) {

    },
    getVendor: async function(req, res, next) {
        console.log(req.params)
        const vendor = await Vendor.getVendor(req.params.id)
        res.status(200).send({data: vendor})
    },

    getVendors:async function(req, res, next) {
        const vendorList=await Vendor.getVendors()
        res.status(200).send({data: vendorList})
    },
    
    removeVendor:async function(req, res, next) {
        console.log(req.params.id)
        try {
            const vendor = Vendor.removeVendor(req.params.id)
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

module.exports = VendorController