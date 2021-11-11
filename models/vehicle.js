const VehicleModel = require("../database/schemas/vehicleSchemaMain")
const User = require("../database/schemas/userSchema")
const { mongoose } = require("../database/connection")

module.exports.create = async (data, vendorId) => {
    try {
        data.forEach(async (item) => {
            const vehicle = new VehicleModel({ ...item, vendorId: vendorId } || {})
            await vehicle.save()
        })
        return
    }
    catch (e) {
        throw e
    }
}

module.exports.createSingle = async (data, vendorId) => {
    let session;
    let success = false
    let vehicle = {}
    try {
        session = await mongoose.connection.startSession()
        // Check if there was a vehicle registered with the same plate number
        const wasAVehicle = await VehicleModel.findOne({plateNumber: data.plateNumber})
        await session.withTransaction(async () => {
            // If there was a no vehicle with this plate number create a new vehicle document
            if (!wasAVehicle) {
                const vehicles = await VehicleModel.create(
                    [{...data, vendorId: vendorId}],
                    {session}
                )
                vehicle = vehicles[0]
            }
            // otherwise update the existing vehicle status and the vendor id
            // because if the previous vendor is sold the vehicle to a new owner
            else if (wasAVehicle.status === "notAvailable") {
                const updatedVehicle = await VehicleModel.updateOne(
                    {_id: wasAVehicle._id},
                    {
                        $set: {
                            status: "available",
                            vendorId: vendorId
                        }
                    }
                )
                if(updatedVehicle["nModified"]) vehicle = {...wasAVehicle['_doc'], status: "available"}
                // if existing document does not update correctly then abort the transaction
                else {
                        await session.abortTransaction()
                        return
                    }
                }
            else {
                throw new Error("Vehicle is already registered!")
            }

            if (vehicle._id) {
                const updatedUser = await User.updateOne(
                    {_id: vendorId},
                    {
                        $push : {
                            'vendor.vehicles': {...data, _id: vehicle._id}
                        }
                    },
                    {session}
                    )
                if(updatedUser['nModified']) success = true
                // if the vendor document does not updated correctly abort the transaction
                else await session.abortTransaction()
            }
        })
        if(success) return vehicle
    }
    catch (e) {
        throw e
    }
    finally {
        session.endSession()
    }
}

module.exports.update = async (id, data, vendorId) => {

    let session;
    let success = false
    const userVendorVehicles = {}
    Object.keys(data).forEach(key => {
        userVendorVehicles[`vendor.vehicles.$.${key}`] = data[key]
    })
    try {
        session = await mongoose.connection.startSession()

        await session.withTransaction(async () => {
            const updatedUser = await User.updateOne(
                {_id: vendorId, 'vendor.vehicles._id' : id},
                {
                    $set: userVendorVehicles
                },
                {session})
            console.log(updatedUser)
            if(updatedUser['nModified']) {
                const updatedVehicle = await VehicleModel.updateOne(
                    {_id: id},
                    {
                        $set: data
                    },
                    {session})
                if(updatedVehicle['nModified']) success = true
                else await session.abortTransaction()
            }
        })
        if(success) return 'Vehicle details are updated successfully!'
        return  'Vehicle is not found!'
    }
    catch (e) {
        throw e
    }
    finally {
        session.endSession()
    }
}

module.exports.getList = async (userId) => {
    return User.findOne({_id: userId}, ["vendor.vehicles"])
}

// get a product
module.exports.get = (id) => {
    return VehicleModel.findOne({ _id: id })
    // return Product.find({_id: id})
}

module.exports.delete = async (id, vendorId) => {
    let session;
    let success = false
    try {
        session = await mongoose.connection.startSession()
        await session.withTransaction(async () => {
            const updatedUser = await User.updateOne(
                {_id: vendorId},
                {
                    $pull: {
                        'vendor.vehicles': {
                            _id: id
                        }
                    }
                },
                {session})
            if(updatedUser['nModified']) {
                const updatedVehicle = await VehicleModel.updateOne(
                    {_id: id},
                    {
                        $set: {
                            status: "notAvailable"
                        }
                    },
                    {session})
                if(updatedVehicle['nModified']) {
                    success = true
                }
                else await session.abortTransaction()
            }
        })
        if(success) return 'Vehicle details are updated successfully!'
        return  'Vehicle is not found!'
    }
    catch (e) {
        throw e
    }
    finally {
        session.endSession()
    }
}