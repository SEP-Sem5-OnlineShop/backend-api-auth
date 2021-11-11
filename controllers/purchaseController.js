const Purchase = require('../models/purchase');
const Product = require('../models/product');

const PurchaseController = {
    createPurchase: async function (req, res, next) {
        //create and return id
        const newPurchase = await Purchase.createPurchase(req.params.vendor_id,req.body.pro,req.body.dailystock_id);
        res.status(200).send(newPurchase._id);
    },
    getPurchase: async function(req, res, next) {
        // console.log(req.params);
        const purchase = await Purchase.getPurchase(req.params.purchase_id);
        res.status(200).send(purchase);
    },
    getPurchaseCount:async function(req, res, next) {
        const count=await Purchase.getPurchaseCount()
        res.status(200).send({count})
    },

    getLastPurchaseDay1:async function(req, res, next) {
        const count=await Purchase.getLastPurchaseDay1()
        res.status(200).send({count})
    },
    getLastPurchaseDay2:async function(req, res, next) {
        const count=await Purchase.getLastPurchaseDay2()
        res.status(200).send({count})
    },

    getLastPurchaseDay3:async function(req, res, next) {
        const count=await Purchase.getLastPurchaseDay3()
        res.status(200).send({count})
    },

    getLastPurchaseDay4:async function(req, res, next) {
        const count=await Purchase.getLastPurchaseDay4()
        res.status(200).send({count})
    },

    getLastPurchaseDay5:async function(req, res, next) {
        const count=await Purchase.getLastPurchaseDay5()
        res.status(200).send({count})
    },

    getCustomerPurchaseList: async function(req, res, next) {
        // console.log(req.params);
        const purchases = await Purchase.getCustomerPurchaseList(req.params.customer_id);
        res.status(200).send(purchases);
    },

    getVendorPurchaseList: async function(req, res, next) {
        console.log(req.params);
        const purchases = await Purchase.getVendorPurchaseList(req.params.vendor_id);
        res.status(200).send(purchases);
    },

    addReview: async function(req, res, next) {
        // console.log('review');
        // console.log(req.params);
        // console.log(req.body);
        const review = await Purchase.addReview(req.params.purchase_id,req.params.product_id,req.body);
        const product = await Product.addReview(req.params.product_id,req.body);
        res.status(200).send(review);
    },
    payPurchase: async function(req, res, next) {
        // console.log(req.params);
        // console.log('customer_id');
        // console.log(req.body);
        const purchase = await Purchase.payPurchase(req.params.order_id, req.body.customer_id);
        res.status(200).send(purchase);
    },
    notify: async function(req, res, next) {
        console.log("notify=====================");
        console.log(req);
        console.log(req.params);
        const purchase = await Purchase.notify(req.params);
        // res.status(200).send(purchase);
    },

    getProduct: async function(req, res, next) {
        console.log(req.params);
        const product = await Purchase.getProduct(req.params.product_id);
        res.status(200).send({product});
    },


}

module.exports = PurchaseController;