const Product = require("../database/schemas/productSchema")
const User = require("../database/schemas/userSchema")
const { mongoose } = require("../database/connection")

module.exports.create = async (data) => {
    let session;
    // console.log(data)
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            await User.updateOne({ _id: data.seller },
                {
                    $push: {
                        'vendor.products': {
                            name: data.name,
                            price: data.price,
                            imageUrl: data.image,
                        }
                    }
                })
            const product = new Product({
                product_name: data.product_name,
                seller: data.name,
                imageThumbnailUrl: data.imageThumbnailUrl,
                imageUrl: data.imageUrl,
                price: data.price,
                description: data.description,
                seller: data.seller
            })
            await product.save()
            const user = await User.findOne({ _id: data.seller })
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

module.exports.update = async (id, data, vendorId) => {
    let session;
    console.log(id, data, vendorId)
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            const updatedProduct = Product.updateOne({ _id: data._id }, 
                {$set: data},
                { session })
            const updateVendor = await User.updateOne({ _id: vendorId, "vendor.products._id": data._id },
                {
                    $set: {...data, name: data.product_name}
                }, { session })
        })
    }
    catch(e) {
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


// update user

// delete user




module.exports.getVendorProductList = async (id) => {
    // const createdProducts = await Product.insertMany([
    //     {
    //         product_name: 'Burger with Fries',
    //         seller: '613eb365af0d5b2c142fa326',
    //         imageThumbnailUrl: '/img/item1.png',
    //         imageUrl: '/img/item1.png',
    //         description: 'product description',
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
    //         description: 'product description',
    //         price: 100,
    //         stock: 0,
    //         status: 'available',
    //     },
    //     {
    //         product_name: 'Burger with Fries',
    //         seller: '613eb365af0d5b2c142fa326',
    //         imageThumbnailUrl: '/img/item1.png',
    //         imageUrl: '/img/item1.png',
    //         description: 'product description',
    //         price: 100,
    //         stock: 10,
    //         status: "available",
    //         rating: 4.5,
    //         numReviews: 1,
    //         reviews: [
    //             {
    //                 rating: 4.0,
    //                 review: 'good product',
    //                 customer: '613ebc89c71d2e07e0ec5e93',
    //             }
    //         ],
    //     }
    // ]);
    return Product.find({ seller: id });
}

module.exports.getVendorSellProductList = async (id) => {
    return Product.find({ seller: id, stock: { $gt: 0 } });
}