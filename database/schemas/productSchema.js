const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
 const reviewSchema = new mongoose.Schema({
    review: {type: String},
})


const productSchema = new mongoose.Schema({
    product_name: {type: String, required: true,min: 2, max: 50,},
    seller: {type: String, required: true, unique: true, min: 10, max: 13,},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number},
    status: {type: String, enum: ["available, notAvailable"]},
    rating: {type: Number},
    numReviews: {type: String, required: true},
    reviews: reviewSchema,
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date},
})

module.exports = mongoose.model('Product', productSchema)