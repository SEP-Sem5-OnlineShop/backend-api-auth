const Vendor = require('../models/vendor')
const Vehicle = require('../models/vehicle')
const {mongoose} = require('../database/connection')
const { sendEmail } = require('../utils/email-service/configuration')
const { createJwtTokenForEmailVerifications, verifyEmailVerificationToken } = require('../utils/tokenHenadler')

const VendorController = {
    createVendor:async function(req, res, next) {
        try {
            const vendor =await Vendor.createVendor(req.body)
            const vehicles = await Vehicle.create(req.body.vendor.vehicles || [], vendor._id)
            const token = createJwtTokenForEmailVerifications({ email: req.body.email })
            // console.log(vendor)
            await vendor.save()
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
            vendor_name: vUser.vendor.shopName || "Yummy Bakers",
            vendor_description: vUser.vendor.vendor_description || "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
            imageUrl: vUser.vendor.imageUrl || "5368f9d8-672a-4090-9be3-b7a95076bd43.jfif",
            rating: vUser.vendor.rating || 0,
            ratingCount: vUser.vendor.numReviews || 0,
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
