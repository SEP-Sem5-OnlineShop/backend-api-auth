const mongoose = require("mongoose")

/**
 * Defining the schema for User model in the database
 * @type {module:mongoose.Schema<Document, Model<any, any, any>, undefined, ExtractMethods<Model<any, any, any>>>}
 */
const userSchema = new mongoose.Schema({
    _id: String,
    fName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    telephone: {
        type: String,
        required: true,
        unique: true,
        min: 10,
        max: 13,
    },
    role: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            required: true,
            default: "Point"
        },
        coordinates: {
            type: Array,
            required: true,
        }
    },
    email: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)