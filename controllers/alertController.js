const Alert = require('../models/alert')
const Product = require('../models/product')
const Vendor = require('../models/vendor')

const AlertController = {
    setAlert: async function(req, res, next) {
        const newAlert = await Alert.setAlert(req.params.customer_id,req.params.product_id);
        res.status(200).send(newAlert);
    },
    removeAlert: async function(req, res, next) {
        const removeAlert = await Alert.removeAlert(req.params.customer_id,req.params.product_id);
        res.status(200).send(removeAlert);
    },
    getdetailsAlert: async function(req, res, next) {
        const alert = await Alert.getdetailsAlert(req.params.customer_id,req.params.product_id);
        // console.log(alert);
        res.status(200).send(alert);
    },
    getCustomerAlertList: async function(req, res, next) {
        // console.log(req.params);
        const alerts = await Alert.getCustomerAlertList(req.params.customer_id);
        // console.log(alerts);
        res.status(200).send(alerts);
    },
    socket: {
        setAlert: (payload) => {
            return payload.productId
        }
    }
}

module.exports = AlertController