const mongoose = require("mongoose")

/**
 * Defining the schemas for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
const locationSchema = new mongoose.Schema({
    type: {type: String, required: true, default: "Point"},
    coordinates: {type: Array, required: true,}
})

const vehicleSchema = new mongoose.Schema({
    vehicle_id: {type: String, required: true},
    plate_number: {type: String, required: true},
})

const driverSchema = new mongoose.Schema({
    license_number: {type: String, required: true, unique: true},
    license_file_url: {type: String, required: true},
    vendor_id: {type: String, required: true},
    location: locationSchema,
})

const customerSchema = new mongoose.Schema({
    location: locationSchema,
})

const vendorSchema = new mongoose.Schema({
    location: locationSchema,
    product_id: [{type: String}],
    driver_id: [{type: String}],
    vehicles: vehicleSchema,
    permit_number: {type: String, required: true},
    permit_file_url: {type: String, required: true},
    status: {type: String, enum: ["pending, accepted, rejected, detailsRequested"]}
})

const userSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true},
    first_name: {type: String, required: true,min: 2, max: 50,},
    last_name: {type: String, required: true,min: 2, max: 50,},
    telephone: {type: String, required: true, unique: true, min: 10, max: 13,},
    role: {type: String, required: true, enum: ["admin", "customer", "vendor", "driver"]},
    email: {type: String},
    password: {type: String, required: true},
    customer: {type: customerSchema, required: () => this.role === "customer"},
    driver: {type: driverSchema, required: () => this.role === "driver"},
    vendor: {type: vendorSchema, required: () => this.role === "vendor"},

})

module.exports = mongoose.model('User', userSchema)