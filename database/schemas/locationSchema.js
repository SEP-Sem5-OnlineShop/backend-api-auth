const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectID, ref: "User", required: true, unique: true, index: true},
    location: {
        type: {type: String, required: true, default: "Point"},
        coordinates: {type: [Number], required: true },
    },
    loginStatus: {type: String, required: true, enum: ["login", "logout"], default: "logout"}
})
locationSchema.index({location: '2dsphere'})
module.exports = mongoose.model('Location', locationSchema)