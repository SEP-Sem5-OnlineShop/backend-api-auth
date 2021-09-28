const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */

const vehicleSchema = require("./vehicleSchema")

const vendorRequestSchema = new mongoose.Schema({
    fullName: {type: String, required: true,min: 2, max: 50,},
    telephone: {type: String, required: true, unique: true, min: 10, max: 13,},
    nic: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    shopName: {type: String, required: true},
    permitId: {type: String, required: true},
    regionToBeCovered: {type: String, required: true},
    numberOfVehicles: {type: Number, required: true},
    vehicles: {type: [vehicleSchema], required: true},
    shopImageUrl: {type: String},
    status:{type: String, enum: ["pending, accepted, rejected"]}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('VendorRequest', vendorRequestSchema)