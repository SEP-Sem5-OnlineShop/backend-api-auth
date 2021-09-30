const VehicleModel = require("../database/schemas/vehicleSchemaMain")

module.exports.create = async (data, vendorId) => {
    try {
        data.forEach(async (item) => {
            const vehicle = new VehicleModel({...item, vendorId: vendorId} || {})
            await vehicle.save()
        })
        return
    }
    catch (e) {
        throw e
    }
}

module.exports.update = (id, data) => {
    return VehicleModel.updateOne({ _id: id }, {
        $set: data
    })
}

module.exports.getList = (userId) => {
    return VehicleModel.find({vendorID: userId})
}

// get a product
module.exports.get = (id) => {
    return VehicleModel.findOne({ _id: id })
    // return Product.find({_id: id})
}