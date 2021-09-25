const Product = require("../database/schemas/productSchema")
const User = require("../database/schemas/userSchema")
const mongoose = require("mongoose")

module.exports.create = async (data) => {
    try {
        await User.updateOne({ _id: data.seller },
        {$push: {
            'vendor.products': {
                name: data.name,
                price: data.price,
                imageUrl: data.image,
            }
        }})
        return new Product({
            product_name: data.name,
            seller: data.name,
            imageThumbnailUrl: data.imageThumbnail,
            imageUrl: data.image,
            price: data.price,
            description: data.description,
            seller: data.seller
        })
    }
    catch (e) {
        console.log(e)
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

module.exports.getList = () => {
    return Product.find({})
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

