const Product = require('../models/product')

const ProductController = {
    create: async function (req, res, next) {
        try {
            await Product.create({...req.body, seller: req.userData.userId})
            return res.status(201).send({
                message: "Successfully added a new product!"
            })
        } catch (e) {
            console.log(e)
            return res.status(400).send({message: "Something went wrong!"})
        }
    },
    update: async function(req, res, next) {
        try {
            const data = await Product.update(req.params.id, req.body)
        }
        catch (e) {

        }
    },
    getList: async function(req, res, next) {
        try {
            const products = await Product.getList()
            return res.status(200).send({
                data: products
            })
        }
        catch (e) {
            res.status(400).send({
                message: "Something went wrong!"
            })
        }
    },

    getProduct: async function(req, res, next) {
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
    getVendorSellProductList: async function(req, res, next) {
        console.log(req.params);
        try{
            console.log(req.params);
            const products = await Product.getVendorSellProductList(req.params.vendor_id);
            res.status(200).send(products);
        } catch (error) {
            console.log("error error error")
            res.status(401).send(error);
        }
    },
    

}

module.exports = ProductController