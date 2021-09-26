const Product = require('../models/product')

const ProductController = {
    create: async function (req, res, next) {
        try {
            const product = Product.create()
            await product.save()
            return res.status(201).send({
                message: "Successfully added a new product!"
            })
        } catch (e) {

        }
    },
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
        try{
            const products = await Product.getVendorProductList(req.params.vendor_id);
            res.status(200).send(products);
        } catch (error) {
            console.log("error error error")
            res.status(401).send(error);
        }
    },
    

}

module.exports = ProductController