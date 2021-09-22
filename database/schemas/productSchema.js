const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
        customer: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    },
    {
        timestamps: true,
    }
);
const productSchema = new mongoose.Schema(
    {
        product_name: { type: String, required: true },
        seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        status: { type: String, required: true},
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        reviews: [reviewSchema],
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;