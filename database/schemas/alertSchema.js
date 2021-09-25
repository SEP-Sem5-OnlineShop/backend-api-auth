const mongoose = require("mongoose")

/**
 * Defining the schema for Alert model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
const alertSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    product_id: { type: mongoose.Schema.Types.ObjectID, ref: 'Product' },
    status: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
  
    setTime: {

            type: String,
            required: true,
        
    },
    
    updateTime: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Alert', alertSchema)