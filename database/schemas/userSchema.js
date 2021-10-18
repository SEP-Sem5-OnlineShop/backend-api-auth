const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */

const vehicleSchema = require("./vehicleSchema")

const driverSchema = new mongoose.Schema({
    licenseNumber: {type: String, required: true, unique: true},
    licenseFileUrl: {type: String},
    imageUrl: {type: String},
    vendorId: {type: String, required: true},
    vehicleId: {type: mongoose.Schema.Types.ObjectID},
    status: {type: String, enum: ["active", "disabled"]},
    loginStatus: {type: String, enum: ["login", "logout"]}
})

// Schemas specifically needed for vendor
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price:{type: Number, required: true},
    rating:{type: Number},
    imageUrl:{type: String, required: true},
})
const vendorDriverSchema = new mongoose.Schema({
    firstName: {type: String, required: true,min: 2, max: 50,},
    lastName: {type: String, required: true,min: 2, max: 50,},
    telephone: {type: String, required: true, unique: true, min: 10, max: 13,},
    email: {type: String, required: true},
    licenseNumber: {type: String, required: true, unique: true},
    licenseFileUrl: {type: String},
})
const vendorSchema = new mongoose.Schema({
    imageUrl: {type: String, required: true},
    address: {type: String,  required: true},
    regionToBeCovered: {type: String, required: true},
    nic: {type: String, required: true},
    products: [productSchema],
    rating: {type: Number},
    numReviews: {type: Number},
    drivers: [vendorDriverSchema],
    vehicles: [vehicleSchema],
    shopName: {type: String, required: true},
    permitNumber: {type: String, required: true},
    permitFileUrl: {type: String},
    description: {type: String},
    status: {type: String, enum: ["pending, accepted, rejected, detailsRequested"]}
})

//base user schema
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true,min: 2, max: 50,},
    lastName: {type: String, required: true,min: 2, max: 50,},
    telephone: {type: String, required: true, unique: true, min: 10, max: 13,},
    role: {type: String, required: true, enum: ["admin", "customer", "vendor", "driver"]},
    email: {type: String},
    password: {type: String, required: function(){return this.role === "customer"}},
    driver: {type: driverSchema, required: function () {return this.role === "driver"}},
    vendor: {type: vendorSchema, required: function () {return this.role === "vendor"}},
    location: {
        type: {type: String, default: "Point", required: true, enum: ["Point"]},
        coordinates: {type: [Number], default: [0,0], required: true },
    }
})
userSchema.index({location: '2dsphere'})
module.exports = mongoose.model('User', userSchema)