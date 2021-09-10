const mongoose = require("mongoose")

/**
 * Defining the schema for purchase model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
const purchaseSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    vendor_id: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    product_id: {
        type: Array,
        required: true,
        min: 2,
        max: 50
    },
    total_amount: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
  
    Discount: {
            type: String,
            required: true,
        
    },
    
    dateTime: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Purchase', purchaseSchema)