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
    
    

}

module.exports = ProductController