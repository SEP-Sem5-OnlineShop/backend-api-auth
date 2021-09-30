const Purchase = require('../models/purchase');
const Product = require('../models/product');


const PurchaseController = {
    createPurchase: async function (req, res, next) {
        //create and return id
        const newPurchase = await Purchase.createPurchase(req.params.vendor_id,req.body);
        res.status(200).send(newPurchase._id);
    },
    getPurchase: async function(req, res, next) {
        console.log(req.params);
        const purchase = await Purchase.getPurchase(req.params.purchase_id);
        res.status(200).send(purchase);
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
        const preview = await Product.addReviewProduct(req.params.product_id,req.body);
        res.status(200).send(review);
    },
    payPurchase: async function(req, res, next) {
        console.log(req.params);
        console.log('customer_id');
        console.log(req.body);
        const purchase = await Purchase.payPurchase(req.params.order_id, req.body.customer_id);
        res.status(200).send(purchase);
    },

}

module.exports = PurchaseController;