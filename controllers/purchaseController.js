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
    getPurchaseCount:async function(req, res, next) {
        const count=await Purchase.getPurchaseCount()
        res.status(200).send({count})
    },

    getCustomerPurchaseList: async function(req, res, next) {
        console.log(req.params);
        const purchases = await Purchase.getCustomerPurchaseList(req.params.customer_id);
        res.status(200).send(purchases);
    },
    addReview: async function(req, res, next) {
        console.log('review');
        console.log(req.params);
        console.log(req.body);
        const review = await Purchase.addReview(req.params.purchase_id,req.params.product_id,req.body);
        res.status(200).send(review);
    },

}

module.exports = PurchaseController;