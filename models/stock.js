const { mongoose } = require("../database/connection")

const DailyStock = require("../database/schemas/dailyStockSchema")

module.exports.create = async (data) => {
    try {
        const result = new DailyStock(data)
        await result.save()
        return result
    }
    catch (e) {
        throw e
    }
}

module.exports.update = async (vendorId, vehicleId, data) => {
    try {
        var start = new Date()
        start.setHours(0, 0, 0, 0)

        var end = new Date()
        end.setHours(23, 59, 59, 999)
        const result = await DailyStock.updateOne({ vendorId: vendorId, vehicleId: vehicleId, createdAt: {$gte: start, $lt:end} }, {$set: data}, {upsert: true})
        return result
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
        return await DailyStock.findOne({ vendorId: vendorId, vehicleId: vehicleId, createdAt: {$gte: start, $lt:end} })
    }
    catch (e) {
        throw e
    }
}
module.exports.getDriverSellProductList = async (vendorId) => {
    var start = new Date()
    start.setHours(0, 0, 0, 0)

    var end = new Date()
    end.setHours(23, 59, 59, 999)
    try {
        return await DailyStock.findOne({ vendorId: vendorId, createdAt: {$gte: start, $lt:end} })
    }
    catch (e) {
        throw e
    }
}