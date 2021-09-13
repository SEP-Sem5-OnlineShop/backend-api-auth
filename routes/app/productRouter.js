const productRouter = require("express").Router()
const expressAsyncHandler = require('express-async-handler')
const Product = require("../../database/schemas/productSchema")
// const data = require("../../data");

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    // const createdProducts = await Product.insertMany([{
    //   product_name: 'Burger with some',
    //   seller: '613a23c0dd295c38362b2cbe',
    //   image: '/img/item1.png',
    //   price: 100,
    //   stock: 10,
    //   status: 'available',
    //   rating: 4.5,
    //   numReviews: 10,
    // },
    // {
    //   product_name: 'Burger with some',
    //   seller: '613a23c0dd295c38362b2cbe',
    //   image: '/img/item1.png',
    //   price: 100,
    //   stock: 10,
    //   status: 'available',
    //   rating: 4.5,
    //   numReviews: 10,
    // }
    // ]);
    const products = await Product.find({});
    res.status(200).send(products);
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