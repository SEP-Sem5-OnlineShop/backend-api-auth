const mongoose = require("mongoose")

const dailyStock = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectID, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    stock: { type: Number }
})

const dailyStockSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectID, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectID, required: true },
    vehicleId: { type: String, required: true },
    dailyStock: [dailyStock],
    route: {type: String, required: true}
},
    { 
        timestamps: true,
    })

module.exports = mongoose.model('DailyStock', dailyStockSchema)