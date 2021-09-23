const admin = require('../models/admin')


const adminController = {

    getAdmin: async function(req, res, next) {
        console.log(req.params)
        const Admin = await admin.getAdmin(req.params.id)
        res.status(200).send({data: Admin})
    },

    

}
module.exports = adminController