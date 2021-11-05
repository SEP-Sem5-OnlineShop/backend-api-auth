const User = require('../database/schemas/userSchema')
const Location = require('../database/schemas/locationSchema')
const DailyStock = require('../database/schemas/dailyStockSchema')
const { mongoose } = require('../database/connection')
const bcrypt = require('bcrypt');
const { updateRequest } = require('./vendorRequest');

module.exports.createDriver = async (vendorId, data) => {
    let session;
    if (vendorId && data) {
        session = await mongoose.connection.startSession()
        try {
            await session.withTransaction(async () => {
                const id = new mongoose.Types.ObjectId()
                const vendor = await User.findOne(
                    { _id: vendorId}
                )
                const driver = new User({
                    _id: id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    telephone: data.telephone,
                    role: "driver",
                    vendorId: vendorId,
                    shopName: vendor.shopName,
                    shopImageUrl: vendor.imageUrl,
                    driver: {
                        licenseNumber: data.licenseNumber,
                        licenseFileUrl: data.licenseFileUrl || "",
                        vendorId: vendorId
                    }
                })
                await driver.save({session})
                await User.updateOne({ _id: vendorId },
                    {
                        $push: {
                            'vendor.drivers': { ...data, _id: id }
                        }
                    }, { session })
            })
        }
        catch (e) {
            throw e
        }
        finally {
            session.endSession()
        }
    }
}

module.exports.createPassword = async (email, password) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await User.updateOne({ email: email }, { password: hashPassword })
    }
    catch (e) {
        throw e
    }
}

module.exports.updateDriver = async (userId, data) => {
    let session;
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            let obj = {}
            Object.keys(data).forEach(key => {
                obj[`vendor.drivers.$.${key}`] = data[key]
            })
            const driver = await User.findOne({ _id: userId })
            const result = await User.updateOne({ _id: userId },
                { $set: data }, { session })
            const updatedResult = await User.updateOne({ _id: driver.driver.vendorId, "vendor.drivers._id": userId },
                {
                    $set: obj
                }, { session })
            // console.log(updateRequest)
            return updatedResult
        })
    }
    catch (e) {
        throw e
    }
    finally {
        session.endSession()
    }
}

module.exports.removeVehicle = async (vendorId) => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)

    const end = new Date()
    end.setHours(23, 59, 59, 999)
    let session;
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            const updatedDriver = await User.updateMany(
                {'driver.vendorId': vendorId},
                {$unset: {'driver.vehicleId': "", 'driver.vehicle': null}},
                {session}
            )
            if(updatedDriver['nModified']) {
                const updatedStock = await DailyStock.updateMany(
                    {vendorId: vendorId, createdAt: { $gte: start, $lt: end }},
                    {$unset: {driverId: ""}},
                    {session}
                )
                if(updatedStock['nModified']) await session.commitTransaction()
                else await session.abortTransaction()
            }
            else await session.abortTransaction()
        })
    }
    catch (e) {
        throw e
    }
    finally {
        await session.endSession()
    }
}

module.exports.getDriver = async (driverId) => {
    try {
        return  await User.findOne(
            {_id: driverId, 'driver.loginStatus': "login"},
            {password: 0}
            )
    }
    catch(e) {
        throw e
    }
}

module.exports.getLoggedDriverList = async (vendorId) => {
    try {
        return await User.find(
            {'driver.vendorId': vendorId, 'driver.loginStatus': "login"},
            {password: 0}
        )
    } catch (e) {
        throw e
    }
}

module.exports.getLoggedDriverListNearby = async ({lat, lng}) => {
    try {
        return await Location.aggregate(
            [
                {
                    $geoNear: {
                        near: { type: "Point",  coordinates: [ parseFloat(lat), parseFloat(lng) ] },
                        distanceField: "dist.calculated",
                        maxDistance: 5000
                    },
                },
                {
                    $match: {
                        loginStatus: "login",
                        role: "driver"
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                }
            ]
        )
    } catch (e) {
        throw e
    }
}

module.exports.getDriversList = async (userId) => {
    try {
        return await User.find({'driver.vendorId': userId})
    }
    catch(e) {
        throw e
    }
}

module.exports.updateImage = async (userId, imageUrl) => {
    try {
        await User.updateOne({ _id: userId }, {
            $set: {
                'driver.imageUrl': imageUrl
            }
        })
    }
    catch (e) {
        throw e
    }
}

module.exports.updateLocation = async (userId, coordinates) => {
    let session;
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            const updatedLocation = await Location.updateOne({ user_id: userId }, {
                $set: {
                    'location.coordinates': coordinates
                }
            })
            if(updatedLocation['nModified']) {
                const updatedDriver = await User.updateOne(
                    {_id: userId},
                    {$set: { 'location.coordinates': coordinates }}
                )
                if(updatedDriver['nModified']) return session.commitTransaction()
                return session.abortTransaction()
            }
            return session.abortTransaction()
        })
    }
    catch (e) {
        throw e
    }
    finally {
        session.endSession()
    }
}

module.exports.updateLoginStatus = async (userId, loginStatus) => {
    let session;
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            const updatedDriver = await User.updateOne(
                {_id: userId},
                {$set: {'driver.loginStatus': loginStatus}},
            )
            if(updatedDriver['nModified']) {
                const updateDocument = await Location.updateOne(
                    {user_id: userId},
                    {$set: {loginStatus: loginStatus}}
                )
                if(updateDocument['nModified']) return session.commitTransaction();
                return session.abortTransaction();
            }
            return session.abortTransaction()
        })
    }
    catch (e) {
        throw e
    }
    finally {
        session.endSession()
    }
}