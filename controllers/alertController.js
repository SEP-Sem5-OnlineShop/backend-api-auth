const Alert = require('../models/alert')

const AlertController = {
    getCustomerAlertList: async function(req, res, next) {
        console.log(req.params);
        const alerts = await Alert.getCustomerAlertList(req.params.customer_id);
        res.status(200).send(alerts);
    },
    getdetailsAlert: async function(req, res, next) {
        console.log(req.params);
        const alert = await Alert.getdetailsAlert(req.params.customer_id,req.params.product_id);
        console.log(alert);
        res.status(200).send(alert);
    },
    setAlert: async function(req, res, next) {
        console.log(req.params);
        const newAlert = await Alert.setAlert(req.params.customer_id,req.params.product_id);
        console.log(newAlert);
        res.status(200).send(newAlert);
    },
    

}

module.exports = AlertController