const productRouter = require("express").Router()
const expressAsyncHandler = require('express-async-handler')
const Product = require("../../models/productModel")
const data = require("../../data")

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

module.exports = productRouter;