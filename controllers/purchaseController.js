const Purchase = require('../models/purchase');

const PurchaseController = {
    createPurchase: async function (req, res, next) {
        //create and return id
        console.log(req.body);
        const newPurchase = await Purchase.createPurchase(req.body);
        console.log(newPurchase);
        res.status(200).send(newPurchase._id);
    },
    getPurchase: async function(req, res, next) {
        console.log(req.params);
        const purchase = await Purchase.getPurchase(req.params.purchase_id);
        res.status(200).send(purchase);
    },

}

module.exports = PurchaseController;