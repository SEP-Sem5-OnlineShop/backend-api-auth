const Product = require('../models/Product')

const ProductController = {
    // create: function(req, res, next) {

    // },
    getProduct: async function(req, res, next) {
        console.log(req.params)
        const product = await Product.getProduct(req.params.id)
        res.status(200).send({data: product})
    },

    getProducts:async function(req, res, next) {
        // const productList=await Product.getProducts(req.params.id)
        const productList=await Product.getProducts(req.params.id)
        res.status(200).send({data: productList})
    },

    getMaxProducts: async function(req, res, next) {
        const productList=await Product.getMaxProducts()
        res.status(200).send({data: productList})
    },
    
    getVendorProductList: async function(req, res, next) {
        console.log(req.params);
        const products = await Product.getVendorProductList(req.params.id);
        res.status(200).send(products);
    },
    

}

module.exports = ProductController