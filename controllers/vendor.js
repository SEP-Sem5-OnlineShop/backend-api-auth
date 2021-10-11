const Vendor = require('../models/vendor')
const Vehicle = require('../models/vehicle')
const {mongoose} = require('../database/connection')
const { sendEmail } = require('../utils/email-service/configuration')
const { createJwtTokenForEmailVerifications, verifyEmailVerificationToken } = require('../utils/tokenHenadler')

const VendorController = {
    createVendor:async function(req, res, next) {
        try {
            const vendorRequest =await Vendor.createVendor(req.body)
            const vehicles = await Vehicle.create(req.body.vendor.vehicles || [])
            const token = createJwtTokenForEmailVerifications({ email: req.body.email })
            // console.log(vendorRequest)
            await vendorRequest.save()
            await sendEmail({
                subject: "Verify your account",
                to: req.body.email || "",
                from: process.env.EMAIL_SERVICE_ADDRESS,
                html: `
                <h4 style="color: #264A75">Hi ${req.body.firstName || ""} ${req.body.lastName || ""}</h4>
                <div>We have created your vendor account</div>
                <div>Please use <a href="http://localhost:3000/create_password/${token}">this</a> link to activate your account.</div>
                `
            })
            
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
    getVendor: async function(req, res, next) {
        console.log(req.params)
        const vendor = await Vendor.getVendor(req.params.id)
        res.status(200).send({data: vendor})
    },

    getVendors:async function(req, res, next) {
        const vendorList=await Vendor.getVendors()
        res.status(200).send({data: vendorList})
    },

    getNumberOfVendors:async function(req, res, next) {
        const count=await Vendor.getNumberOfVendors()
        res.status(200).send({count})
    },
    
    removeVendor:async function(req, res, next) {
        console.log(req.params.id)
        console.log(req.params)
        const email_address=await Vendor.getEmail(req.params.id)
        console.log(email_address.email)
        try {
            await Vendor.removeVendor(req.params.id)
            await sendEmail({
                subject: "Your account has been removed",
                to: email_address.email || "",
                from: process.env.EMAIL_SERVICE_ADDRESS,
                html: `
                <h4 style="color: #264A75">Hi ${req.body.firstName || ""} ${req.body.lastName || ""}</h4>
                <div>We have removed your vendor account due to some unavoidable reasons. You can registered to the system as a new vendor. </div>
                `
            })
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
            vendor_name: vUser.vendor.vendor_name || "Yummy Backers",
            vendor_description: vUser.vendor.vendor_description || "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
            imageUrl: vUser.vendor.imageUrl || "/img/vendor.jpg",
            rating: vUser.vendor.rating || 4,
            ratingCount: vUser.vendor.ratingCount || 2,
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






