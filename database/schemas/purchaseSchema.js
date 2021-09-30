const mongoose = require("mongoose")

/**
 * Defining the schema for purchase model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
const purchaseSchema = new mongoose.Schema({
    vendor_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true },
    customer_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    status: {type: String, enum: ["open", "closed"], required: true },
    totalItems: {type: Number, required: true },
    totalCost: {type: Number, required: true },
    products: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: true},
            price: {type: Number, required: true},
            items: {type: Number, required: true},
            rating: { type: Number},
            review: {type: String},
        }
    ],
    discount: {type: Number,required: true,}
},
{
    timestamps: true,
})

module.exports = mongoose.model('Purchase', purchaseSchema)