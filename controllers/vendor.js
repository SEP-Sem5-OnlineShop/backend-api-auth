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
        
    },
    getVendorDetailsForCustomer:async function(req, res, next) {
        console.log(req.params);
        const vUser = await Vendor.getVendor(req.params.id);

        const vendor = {
            vendor_id: vUser._id || "613eb365af0d5b2c142fa326",
            vendor_name: vUser.vendor.shopName || "Yummy Bakers",
            vendor_description: vUser.vendor.vendor_description || "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
            imageUrl: vUser.vendor.imageUrl || "5368f9d8-672a-4090-9be3-b7a95076bd43.jfif",
            rating: vUser.vendor.rating || 0,
            ratingCount: vUser.vendor.ratingCount || 0,
        };
        res.status(200).send(vendor);
    },
    getVendorListForCustomer:async function(req, res, next) {
        console.log(req.params);
        const vendors = await Vendor.getVendors();
        res.status(200).send(vendors);
    }

}

module.exports = VendorController