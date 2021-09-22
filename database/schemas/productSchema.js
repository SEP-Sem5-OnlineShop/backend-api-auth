const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
 const reviewSchema = new mongoose.Schema({
    review: {type: String},
})


const productSchema = new mongoose.Schema({
    product_name: {type: String, required: true},
    seller: {type: String, required: true},
    price: {type: Number, required: true},
    imageThumbnailUrl: {type: String, required: true},
    imageUrl: {type: String, required: true},
    status: {type: String, enum: ["available, notAvailable"]},
    numReviews: {type: String},
    stock: {type: Number},
    rating: {type: Number},
    reviews: reviewSchema,
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('Product', productSchema)