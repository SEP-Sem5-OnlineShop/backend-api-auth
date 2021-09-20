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
    
    update: function(req, res, next) {
        
    }

}

module.exports = VendorController