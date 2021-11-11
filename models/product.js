const Product = require("../database/schemas/productSchema")
const User = require("../database/schemas/userSchema")
const { mongoose } = require("../database/connection")
const Vendor = require('../models/vendor');

module.exports.create = async (data) => {
    let session
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            const product = new Product({
                product_name: data.product_name,
                seller: data.seller,
                imageThumbnailUrl: data.imageThumbnailUrl,
                imageUrl: data.imageUrl,
                price: data.price,
                description: data.description,
                category: data.category
            })
            if (product && product._id)
                await User.updateOne({ _id: data.seller },
                    {
                        $push: {
                            'vendor.products': {
                                _id: product._id,
                                name: product.product_name,
                                price: product.price,
                                imageUrl: product.imageUrl,
                            }
                        }
                    })
            await product.save()
            return User.findOne({_id: data.seller});
        })
    }
    catch (e) {
        console.log(e)
        throw e
    }
    finally {
        session.endSession()
    }
}

module.exports.update = async (id, data, vendorId) => {
    let session;
    const userVendorProducts = {}
    Object.keys(data).forEach(key => {
        userVendorProducts[`vendor.products.$.${key}`] = data[key]
    })
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            const updatedProduct = await Product.updateOne(
                { _id: data._id },
                { $set: data },
                { session })
            if(updatedProduct['nModified']) {
                await User.updateOne(
                    { _id: vendorId, "vendor.products._id": id },
                    {$set: userVendorProducts},
                    { session })
                await session.commitTransaction()
            }
            else {
                await session.abortTransaction()
            }
        })
    }
    catch (e) {
        throw e
    }
    finally {
        session.endSession()
    }
}

module.exports.getList = (userId) => {
    return Product.find({ seller: userId })
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


// update product

// delete product
module.exports.delete = async (id, vendorId) => {
    let session;
    let success = false
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            const deletedProduct = await User.updateOne(
                { _id: vendorId },
                {
                        $pull: {
                            'vendor.products': {
                                _id: id
                            }
                        }
                    },
                { session })
            if(deletedProduct['nModified']) {
                const updatedProduct = await Product.updateOne({ _id: id },
                    {
                        $set: {
                            status: "notAvailable"
                        }
                    }, { session }
                )
                if(updatedProduct['nModified'])
                    success = true
            }
            return 'Specified product is not available'
        })
        if(success) return 'Product is successfully deleted!'
        return 'Specified product is not available'
    }
    catch (e) {
        throw e
    }
}




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

module.exports.getProductListForCustomer = async () => {
    return Product.find({ discount: { $gt: 0 } });
}
module.exports.getFruitsListForCustomer = async () => {
    return Product.find({ category: "Fruit" });
}
module.exports.getVegetablesListForCustomer = async () => {
    return Product.find({ category: "Vegetable" });
}
module.exports.getBakeryListForCustomer = async () => {
    return Product.find({ category: "Bakery" });
}
module.exports.getPlantListForCustomer = async () => {
    return Product.find({ category: "Plant" });
}
module.exports.getDessertListForCustomer = async () => {
    return Product.find({ category: "Dessert" });
}