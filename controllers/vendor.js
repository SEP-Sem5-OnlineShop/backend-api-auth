const Vendor = require('../models/vendor')

const VendorController = {
    create: function(req, res, next) {

    },
    getVendor: function(req, res, next) {

    },

    getVendors:async function(req, res, next) {
        const vendorList=await Vendor.getVendors()
        res.status(200).send({data: vendorList})
    },
    
    update: function(req, res, next) {
        
    }

}

module.exports = VendorController