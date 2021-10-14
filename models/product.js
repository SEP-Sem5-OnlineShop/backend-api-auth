const Product = require("../database/schemas/productSchema")
const User = require("../database/schemas/userSchema")
const {mongoose} = require("../database/connection")
const Vendor = require('../models/vendor');

module.exports.create = async (data) => {
    let session;
    console.log(data)
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            await User.updateOne({ _id: data.seller },
            {$push: {
                'vendor.products': {
                    name: data.name,
                    price: data.price,
                    imageUrl: data.image,
                }
            }})
            const product = new Product({
                product_name: data.name,
                seller: data.name,
                imageThumbnailUrl: data.imageThumbnail,
                imageUrl: data.image,
                price: data.price,
                description: data.description,
                seller: data.seller
            })
            await product.save()
            const user = await User.findOne({_id: data.seller})
            return user
        })
    }
    catch (e) {
        throw e
    }
    finally {
        session.endSession()
    }
}

module.exports.update = (id, data) => {
    return Product.updateOne({ _id: id }, {
        product_name: data.name,
        seller: data.name,
        imageThumbnailUrl: data.imageThumbnail,
        imageUrl: data.image,
        price: data.price,
        description: data.description
    })
}

module.exports.getList = (userId) => {
    return Product.find({seller: userId})
}

// get a product
module.exports.getProduct = (id) => {
    return Product.findOne({ _id: id })
    // return Product.find({_id: id})
}

// get vendors
module.exports.getProducts = async (id) => {
    // var ObjectId=require('mongoose').Types.ObjectId;
    // return await Product.find({})

    return Product.find({ seller: id });
    // return Vendor.find({role: {$elemMatch :"vendor"}})
}

//get max ratings
module.exports.getMaxProducts = async () => {
    return Product.find({}).sort({ "rating": -1 }).limit(5);
}


// update user

// delete user




module.exports.getVendorProductList = async (id) => {
    return Product.find({seller: id});
}

module.exports.getVendorSellProductList = async (id) => {
    return Product.find({ seller:id, stock: { $gt: 0 } });
}

module.exports.addReview = async (product_id,review) => {
    const prod = await module.exports.getProduct(product_id);
    const newNumReviews = prod.numReviews + 1;
    const newRating = (prod.rating*prod.numReviews + review.rating)/ newNumReviews ;
    const vendor = await Vendor.addRating(prod.seller,review.rating);
    return Product.updateOne(
        { "_id": product_id},
        { 
            "rating": newRating,
            "numReviews": newNumReviews,
            "$push": {
                "reviews": {
                    "customer" : review.customer_id,
                    "rating" : review.rating,
                    "review" : review.review
                }
            }
        }
    );
}