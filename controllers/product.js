const Product = require('../models/product')

const ProductController = {
    create: async function (req, res, next) {
        try {
            const product = Product.create(req.body, req.userData)
            await product.save()
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
    }
}

module.exports = ProductController