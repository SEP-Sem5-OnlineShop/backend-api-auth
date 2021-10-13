const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */

const vehicleSchema = new mongoose.Schema({
    plateNumber: {type: String, unique: true},
    brand: {type: String},
    model: {type: String},
    imageUrl: {type: String},
    documentUrl: {type: String},
    vendorId: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectID },
    status: {type: String, enum: ["available", "notAvailable"], default: "available"}
})

module.exports = mongoose.model('VehicleSchema', vehicleSchema)