const mongoose = require("mongoose")

/**
 * Defining the schema for Alert model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
const alertSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: true },
    driver_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Alert', alertSchema)