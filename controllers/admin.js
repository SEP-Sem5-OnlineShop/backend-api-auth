const admin = require('../models/admin')


const adminController = {

    getAdmin: async function(req, res, next) {
        console.log(req.params)
        const Admin = await admin.getAdmin(req.params.id)
        res.status(200).send({data: Admin})
    },

    createAdmin:async function(req, res, next) {
        try {
            const adminCreate =await admin.createAdmin(req.body)
            // console.log(vendorRequest)
            await adminCreate.save()
            
            
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

    

}
module.exports = adminController