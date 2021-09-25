const Alert = require('../models/alert')

const AlertController = {
    getCustomerAlertList: async function(req, res, next) {
        console.log(req.params);
        const alerts = await Alert.getCustomerAlertList(req.params.customer_id);
        res.status(200).send(alerts);
    },
    

}

module.exports = AlertController