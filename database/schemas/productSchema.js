const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
 const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    review: {type: String},
    customer: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
},
{
    timestamps: true,
})


const productSchema = new mongoose.Schema({
    product_name: {type: String, required: true,min: 2, max: 50,},
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number},
    status: {type: String, enum: ["available", "notAvailable"]},
    rating: {type: Number},
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
},
{
    timestamps: true,
})

module.exports = mongoose.model('Product', productSchema)