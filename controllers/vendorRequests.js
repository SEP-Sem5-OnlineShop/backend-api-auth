const VendorRequest = require('../models/vendorRequest')
const { sendEmail } = require('../utils/email-service/configuration')
const { createJwtTokenForEmailVerifications, verifyEmailVerificationToken } = require('../utils/tokenHenadler')

const VendorRequestController = {

    create: async function (req, res, next) {
        try {
            const vendorRequest = VendorRequest.createRequest(req.body)
            await vendorRequest.save()
            return res.status(201).send(
                {
                    message: "Request was sent successfully!",
                }
            )
        }
        catch (e) {
            console.log(e)
            return res.status(400).send(e)
        }
    },

    update: async function(req, res, next) {
        try {
            const result = await VendorRequest.updateRequest(req.body)
            console.log(result)
            return res.status(200).send({
                message: "Successfully updated!"
            })
        }
        catch (e) {
            return res.status(400).send({ message: "Something went wrong!" })
        }
    },

    getRequestUsingToken: async function (req, res, next) {
        const token = req.params.id
        const {email} = verifyEmailVerificationToken(token)
        try {
            const vendorRequest = await VendorRequest.getRequestByEmail(email)
            return res.status(200).send({
                message: "Success",
                data: vendorRequest
            })
        }
        catch(e) {
            return res.status(400).send({
                message: "Failed",
                data: "Something went wrong!"
            })
        }

    },

    getRequest: async function (req, res, next) {
        console.log(req.params)
        const request = await VendorRequest.getRequest(req.params.id)
        res.status(200).send({ data: request })
    },

    verifyRequestByTelephoneNumber: async function (req, res, next) {
        const email = req.body.email
        try {
            const vendorRequest = await VendorRequest.getRequestByEmail(email)
            console.log(vendorRequest)
            if (vendorRequest) {
                const token = createJwtTokenForEmailVerifications({email: email})
                await sendEmail({
                    subject: "Verify your account for update request",
                    to: email || "",
                    from: process.env.EMAIL_SERVICE_ADDRESS,
                    html: `
                    <h4 style="color: #264A75">Hi ${email.split('@')[0]}</h4>
                    <div>Please use <a href="http://localhost:3000/register/vendor/${token}">this</a> link to edit your previous request.</div>
                    `
                })
                return res.status(200).send(
                    {
                        message: "Success",
                        data: "Your verification email was sent to the email for updating the request. Please check your email inbox..."
                    }
                )
            }
            return res.status(200).send(
                {
                    message: "Success",
                    data: null
                }
            )
        }
        catch (e) {
            console.log(e)
            return res.status(400).send(e)
        }
    },

    getRequests: async function (req, res, next) {
        const requests = await VendorRequest.getRequests()
        res.status(200).send({ data: requests })
    },



    updateStatus:async function(req, res, next) {
        console.log('controller id',req.params.id)
        
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
        
    },


    rejectRequest:async function(req, res, next) {
        console.log('controller id',req.params.id)
        // console.log(req.params)
        const email_address=await VendorRequest.getEmail(req.params.id)
        console.log('controller email',email_address.email)
        try {
            await VendorRequest.rejectRequest(req.params.id)
            await sendEmail({
                subject: "Your account has been removed",
                to: email_address.email || "",
                from: process.env.EMAIL_SERVICE_ADDRESS,
                html: `
                <h4 style="color: #264A75">Hi ${req.body.firstName || ""} ${req.body.lastName || ""}</h4>
                <div>We have rejected your request due to some unavoidable reasons. You can reaply for a vendor account. </div>
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
        
    }

}

module.exports = VendorRequestController