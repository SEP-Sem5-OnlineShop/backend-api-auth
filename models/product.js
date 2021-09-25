const Product = require("../database/schemas/productSchema")
const mongoose = require("mongoose")

module.exports.create = () => {
    return new Product({
        product_name: {type: String, required: true},
        seller: {type: String, required: true},
        imageThumbnailUrl: {type: String, required: true},
        imageUrl: {type: String, required: true},
        price: {type: Number, required: true},
    })
}

// get a product
module.exports.getProduct = (id) => {
    return Product.findOne({_id: id}) 
    // return Product.find({_id: id})
}

// get vendors
module.exports.getProducts = async (id) => {
    // var ObjectId=require('mongoose').Types.ObjectId;
    // return await Product.find({})
   
    return Product.find({seller: id});
    // return Vendor.find({role: {$elemMatch :"vendor"}})
}

//get max ratings
module.exports.getMaxProducts = async () =>{
    return Product.find({}).sort({"rating": -1}).limit(5);
}


// update user

// delete user




module.exports.getVendorProductList = async (id) => {
    // const createdProducts = await Product.insertMany([
    //     {
    //         product_name: 'Burger with Fries',
    //         seller: '613eb365af0d5b2c142fa326',
    //         imageThumbnailUrl: '/img/item1.png',
    //         imageUrl: '/img/item1.png',
    //         price: 100,
    //         stock: 10,
    //         status: 'available',
    //         rating: 4.5,
    //         numReviews: 2,
    //         reviews: [
    //             {
    //                 rating: 4.0,
    //                 review: 'good product',
    //                 customer: '613ebc89c71d2e07e0ec5e93',
    //             },
    //             {
    //                 rating: 5.0,
    //                 review: 'good product',
    //                 customer: '613ebc89c71d2e07e0ec5e93',
    //             },
    //         ],
    //     },
    //     {
    //         product_name: 'Burger with Fries',
    //         seller: '613eb365af0d5b2c142fa326',
    //         imageThumbnailUrl: '/img/item1.png',
    //         imageUrl: '/img/item1.png',
    //         price: 100,
    //         stock: 10,
    //         status: 'available',
    //         rating: 4.5,
    //         numReviews: 2,
    //         reviews: [
    //             {
    //                 rating: 4.0,
    //                 review: 'good product',
    //                 customer: '613ebc89c71d2e07e0ec5e93',
    //             },
    //             {
    //                 rating: 5.0,
    //                 review: 'good product',
    //                 customer: '613ebc89c71d2e07e0ec5e93',
    //             },
    //         ],
    //     },
    //     {
    //         product_name: 'Burger with Fries',
    //         seller: '613eb365af0d5b2c142fa326',
    //         imageThumbnailUrl: '/img/item1.png',
    //         imageUrl: '/img/item1.png',
    //         price: 100,
    //         stock: 10,
    //         status: 'available',
    //         rating: 4.5,
    //         numReviews: 2,
    //         reviews: [
    //             {
    //                 rating: 4.0,
    //                 review: 'good product',
    //                 customer: '613ebc89c71d2e07e0ec5e93',
    //             },
    //             {
    //                 rating: 5.0,
    //                 review: 'good product',
    //                 customer: '613ebc89c71d2e07e0ec5e93',
    //             },
    //         ],
    //     }
    // ]);
    return Product.find({seller: id});
}