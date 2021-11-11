const admin = require('../models/admin')
const User = require('../models/user')
const { sendEmail } = require('../utils/email-service/configuration')
const { createJwtTokenForEmailVerifications, verifyEmailVerificationToken } = require('../utils/tokenHenadler')

const adminController = {

    getAdmin: async function(req, res, next) {
        // console.log(req.params)
        const Admin = await admin.getAdmin(req.params.id)
        res.status(200).send({data: Admin})
    },

    updateAdmin:  async function(req, res, next) {
        try {
            const result = await admin.updateAdmin(req.body)
            console.log(result)
            return res.status(200).send({
                message: "Successfully updated!"
            })
        }
        catch (e) {
            return res.status(400).send({ message: "Something went wrong!" })
        }
    },

    createAdmin:async function(req, res, next) {
        try {
            const adminCreate =await admin.createAdmin(req.body)

            const userByEmail = await User.getUserByEmail(req.body.email)
            const token = createJwtTokenForEmailVerifications({ email: req.body.email })
            // console.log(vendorRequest)
            await adminCreate.save()

            await sendEmail({
                subject: "Verify your account",
                to: req.body.email || "",
                from: process.env.EMAIL_SERVICE_ADDRESS,
                html: `
                <h4 style="color: #264A75">Hi ${req.body.firstName || ""} ${req.body.lastName || ""}</h4>
                <div>We have created your admin account</div>
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
            return res.status(400).send(e)
        }
    },



    // createAdmin: async (req, res, next) => {
    //     try {
    //         // const userByTelephone = await User.getUserByTelephone(req.body.telephone)
    //         // const userByEmail = await User.getUserByEmail(req.body.email)
    //         const token = createJwtTokenForEmailVerifications({ email: req.body.email })

    //                 await admin.createAdmin(req.body)
    //                 await sendEmail({
    //                     subject: "Verify your account",
    //                     to: req.body.email || "",
    //                     from: process.env.EMAIL_SERVICE_ADDRESS,
    //                     html: `
    //                     <h4 style="color: #264A75">Hi ${req.body.firstName || ""} ${req.body.lastName || ""}</h4>
    //                     <div>We have created your admin account</div>
    //                     <div>Please use <a href="http://localhost:3000/create_password/${token}">this</a> link to activate your account.</div>
    //                     `
    //                 })
    //                 return res.status(201).send({
    //                     message: 'Admin is registered successfully!'
    //                 })
    //         // if (!userByTelephone) {
    //         //     if (!userByEmail) {
    //         //         await admin.createAdmin(req.body)
    //         //         await sendEmail({
    //         //             subject: "Verify your account",
    //         //             to: req.body.email || "",
    //         //             from: process.env.EMAIL_SERVICE_ADDRESS,
    //         //             html: `
    //         //             <h4 style="color: #264A75">Hi ${req.body.firstName || ""} ${req.body.lastName || ""}</h4>
    //         //             <div>We have created your admin account</div>
    //         //             <div>Please use <a href="http://localhost:3000/create_password/${token}">this</a> link to activate your account.</div>
    //         //             `
    //         //         })
    //         //         return res.status(201).send({
    //         //             message: 'Admin is registered successfully!'
    //         //         })
    //         //     }
    //         //     return res.status(400).send({
    //         //         message: 'User is already registered using given email!'
    //         //     })
    //         // }
    //         // return res.status(400).send({
    //         //     message: 'User is already registered using give telephone number!'
    //         // })

    //     }
    //     catch (e) {
    //         return res.status(400).send({
    //             message: e.message
    //         })
    //     }
    // },

    createPassword: async function (req, res, next) {
        try {
            if (req.body.token) {
                const data = verifyEmailVerificationToken(req.body.token)
                if (data.email) {
                    await admin.createPassword(data.email, req.body.password)
                    return res.status(200).send({
                        message: "Password is created successfully!"
                    })
                }
                return res.status(400).send({
                    message: "Token  is not valid!"
                })
            }
            return res.status(400).send({
                message: "Token  is empty!"
            })
        }
        catch (e) {
            console.log(e)
            return res.status(400).send({
                message: "Something went wrong!"
            })
        }
    },

    

}
module.exports = adminController