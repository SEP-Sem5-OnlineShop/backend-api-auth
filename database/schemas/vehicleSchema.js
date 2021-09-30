const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */

const vehicleSchema = new mongoose.Schema({
    plateNumber: {type: String},
    brand: {type: String},
    model: {type: String},
    imageUrl: {type: String},
    documentUrl: {type: String}
})

module.exports = vehicleSchema
module.exports.vehicleModel = mongoose.model('Vehicle', vehicleSchema)