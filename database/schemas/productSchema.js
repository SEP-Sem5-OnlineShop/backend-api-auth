const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
 const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    review: {type: String, required: true},
    customer: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true },
},
{
    timestamps: true,
})


const productSchema = new mongoose.Schema({
    product_name: {type: String, required: true},
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true },
    price: {type: Number, required: true},
    imageThumbnailUrl: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ["available", "notAvailable"], default: "available"},
    discount: {type: Number, default: 0},
    stock: {type: Number, default: 0},
    rating: {type: Number, default: 0},
    numReviews: {type: Number, default: 0},
    reviews: [reviewSchema],
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('Product', productSchema)