const Product = require('../models/product')
const User = require("../models/user")

const ProductController = {
    create: async function (req, res, next) {
        try {
            const product = await Product.create({...req.body, seller: req.userData.userId})
            return res.status(201).send({
                message: "Success",
                data: product
            })
        } catch (e) {
            return res.status(400).send(
                {
                    message: "Failed",
                    data: e.message
                })
        }
    },
    update: async function(req, res, next) {
        try {
            const data = await Product.update(req.params.id, req.body, req.userData.userId)
            return res.status(201).send({
                message: "Success",
                data: data
            })
        }
        catch (e) {
            return res.status(400).send({message: "Something went wrong!"})
        }
    },
    getList: async function(req, res, next) {
        try {
            const data = await Product.getList(req.userData.userId)
            return res.status(200).send({
                data: data
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

    deleteProduct: async function(req, res, next) {
        try {
            const data = await Product.delete(req.params.id, req.userData.userId)
            return res.status(202).send({
                message: "Success",
                data: data
            })
        }
        catch (e) {
            return  res.status(400).send({
                message: "Failed",
                data: e.message
            })
        }
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
        // console.log(req.params);
        try{
            const products = await Product.getVendorProductList(req.params.vendor_id);
            res.status(200).send(products);
        } catch (error) {
            // console.log("error error error")
            res.status(401).send(error);
        }
    },
    getVendorSellProductList: async function(req, res, next) {
        // console.log(req.params);
        try{
            // console.log(req.params);
            const products = await Product.getVendorSellProductList(req.params.vendor_id);
            res.status(200).send(products);
        } catch (error) {
            // console.log("error error error")
            res.status(401).send(error);
        }
    },
    getCustomerForProductReview: async function(req, res, next) {
        const user = await User.getUserById(req.params.customer_id)
        let userDetails = {_id:user._id, name:user.firstName+" "+user.lastName};
        res.status(200).send(userDetails);
    },
    getProductListForCustomer: async function(req, res, next) {
        // console.log(req.params);
        try{
            console.log(req.params);
            const products = await Product.getProductListForCustomer();
            res.status(200).send(products);
        } catch (error) {
            // console.log("error error error")
            res.status(401).send(error);
        }
    },
    getFruitsListForCustomer: async function(req, res, next) {
        // console.log(req.params);
        try{
            console.log(req.params);
            const products = await Product.getFruitsListForCustomer();
            res.status(200).send(products);
        } catch (error) {
            // console.log("error error error")
            res.status(401).send(error);
        }
    },
    getVegetablesListForCustomer: async function(req, res, next) {
        // console.log(req.params);
        try{
            console.log(req.params);
            const products = await Product.getVegetablesListForCustomer();
            res.status(200).send(products);
        } catch (error) {
            // console.log("error error error")
            res.status(401).send(error);
        }
    },
    getBakeryListForCustomer: async function(req, res, next) {
        // console.log(req.params);
        try{
            console.log(req.params);
            const products = await Product.getBakeryListForCustomer();
            res.status(200).send(products);
        } catch (error) {
            // console.log("error error error")
            res.status(401).send(error);
        }
    },
    getPlantListForCustomer: async function(req, res, next) {
        // console.log(req.params);
        try{
            console.log(req.params);
            const products = await Product.getPlantListForCustomer();
            res.status(200).send(products);
        } catch (error) {
            // console.log("error error error")
            res.status(401).send(error);
        }
    },
    getDessertListForCustomer: async function(req, res, next) {
        // console.log(req.params);
        try{
            console.log(req.params);
            const products = await Product.getDessertListForCustomer();
            res.status(200).send(products);
        } catch (error) {
            // console.log("error error error")
            res.status(401).send(error);
        }
    },
    

}

module.exports = ProductController