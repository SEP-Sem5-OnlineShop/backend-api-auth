const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
const locationSchema = new mongoose.Schema({
    type: {type: String, required: true, default: "Point"},
    coordinates: {type: Array, required: true,}
})

const vehicleSchema = require("./vehicleSchema")

const driverSchema = new mongoose.Schema({
    licenseNumber: {type: String, required: true, unique: true},
    licenseFileUrl: {type: String},
    imageUrl: {type: String},
    vendorId: {type: String, required: true},
    location: locationSchema,
    status: {type: String, enum: ["active, disabled"]}
})

const customerSchema = new mongoose.Schema({
    location: locationSchema,
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
    vendor_name: {type: String, required: true,min: 2, max: 50,},
    vendor_description: {type: String,  required: true},
    imageUrl: {type: String, required: true},
    location: locationSchema,
    products: [productSchema],
    rating: {type: Number},
    numReviews: {type: Number},
    drivers: [vendorDriverSchema],
    vehicles: vehicleSchema,
    shopName: {type: String, required: true},
    permitNumber: {type: String, required: true},
    permitFileUrl: {type: String, required: true},
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
    customer: {type: customerSchema, required: this.role === "customer"},
    driver: {type: driverSchema, required: this.role === "driver"},
    vendor: {type: vendorSchema, required: this.role === "vendor"},
})

module.exports = mongoose.model('User', userSchema)