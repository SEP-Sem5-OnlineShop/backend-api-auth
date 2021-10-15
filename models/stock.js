const { mongoose } = require("../database/connection")

const DailyStock = require("../database/schemas/dailyStockSchema")
const Product = require("../database/schemas/productSchema")

module.exports.create = async (data) => {
    let session;
    try {
        session = await mongoose.connection.startSession()
        const result = await DailyStock.create([data], {session})
        return result
    }
    catch (e) {
        throw e
    }
}

module.exports.update = async (vendorId, vehicleId, data) => {
    try {
        if (data.dailyStock && data.dailyStock.length) {
            data.dailyStock.map(async (item) => {
                await Product.updateOne({ _id: item.productId },
                    { $set: { price: item.price, stock: item.stock, discount: item.discount } }
                )
            })
        }
        const start = new Date()
        start.setHours(0, 0, 0, 0)

        const end = new Date()
        end.setHours(23, 59, 59, 999)
        return await DailyStock.updateOne({
            vendorId: vendorId,
            vehicleId: vehicleId,
            createdAt: {$gte: start, $lt: end}
        }, {$set: data}, {runValidators: true})
    }
    catch (e) {
        throw e
    }
}

module.exports.get = async (vendorId, vehicleId) => {
    var start = new Date()
    start.setHours(0, 0, 0, 0)

    var end = new Date()
    end.setHours(23, 59, 59, 999)
    try {
        return await DailyStock.findOne({ vendorId: vendorId, vehicleId: vehicleId, createdAt: { $gte: start, $lt: end } })
    }
    catch (e) {
        throw e
    }
}