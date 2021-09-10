const productRouter = require("express").Router()
const expressAsyncHandler = require('express-async-handler')
const Product = require("../../database/schemas/productSchema")
// const data = require("../../data");

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

// productRouter.get(
//   '/seed',
//   expressAsyncHandler(async (req, res) => {
//     await Product.remove({});
//     const createdProducts = await Product.insertMany(data.products);
//     res.send({ createdProducts });
//   })
// );

module.exports = productRouter;