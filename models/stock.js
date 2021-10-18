const { mongoose } = require("../database/connection")

const DailyStock = require("../database/schemas/dailyStockSchema")
const Product = require("../database/schemas/productSchema")
const User = require("../database/schemas/userSchema")

module.exports.create = async (data) => {
    let session;
    session = await mongoose.connection.startSession()
    try {
        await session.withTransaction(async () => {
            const result = await DailyStock.create([data], {session})
            if(result[0]._id) {
                const updatedDriver = await User.updateOne(
                    {_id: data.driverId},
                    {$set: {
                            'driver.vehicleId': mongoose.Types.ObjectId(data.vehicleId)
                        }},
                    {session}
                )

                await Promise.all(
                    data.dailyStock.map(async (item) => {
                        await Product.updateOne(
                            { _id: item.productId },
                            { $inc: { stock: item.stock }},
                            {session}
                        )
                    })
                )

                if(updatedDriver['nModified']) await session.commitTransaction()
                else await session.abortTransaction()
            }
            else await session.abortTransaction()
            return result
        })
    }
    catch (e) {
        throw e
    }
    finally {
        await session.endSession()
    }
}

module.exports.update = async (data) => {
    let session
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {

            const start = new Date()
            start.setHours(0, 0, 0, 0)

            const end = new Date()
            end.setHours(23, 59, 59, 999)

            await DailyStock.findOne(
                {vehicleId: data.vehicleId, updatedAt: {$gte: start, $lt: end}},
                'driverId dailyStock',
                async function (err, stock) {
                    if(err) throw err
                    if(stock.driverId !== mongoose.Types.ObjectId(data.driverId)) {
                        await User.updateOne({_id: stock.driverId},
                            {$unset: {'driver.vehicleId': ""}})
                        await User.updateOne({_id: data.driverId},
                            {$set: {'driver.vehicleId': data.vehicleId}})
                    }

                    await Promise.all(
                        data.dailyStock.map(async (item, index) => {
                            await Product.updateOne(
                                {_id: item.productId},
                                {$inc: {stock: (item.stock - stock.dailyStock[index].stock)}}
                            )
                        })
                    )
                }
            )

            const updatedStock = await DailyStock.updateOne({
                vehicleId: data.vehicleId,
                createdAt: {$gte: start, $lt: end}
            }, {$set: data}, {runValidators: true, session: session})
            if(!updatedStock['nModified']) await session.abortTransaction()
        })
    }
    catch (e) {
        throw e
    }
    finally {
        await session.endSession()
    }
}

module.exports.get = async (vehicleId) => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)

    const end = new Date()
    end.setHours(23, 59, 59, 999)
    try {
        return await DailyStock.findOne({ vehicleId: vehicleId, createdAt: { $gte: start, $lt: end } })
    }
    catch (e) {
        throw e
    }
}

module.exports.getByDriverId = async (driverId) => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)

    const end = new Date()
    end.setHours(23, 59, 59, 999)
    try {
        return await DailyStock.findOne({ driverId: driverId, createdAt: { $gte: start, $lt: end } })
    }
    catch (e) {
        throw e
    }
}