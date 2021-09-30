const {vehicleModel} = require("../database/schemas/vehicleSchema")

module.exports.create = async (data) => {
    try {
        data.forEach(async (item) => {
            const vehicle = new vehicleModel(item || {})
            await vehicle.save()
        })
        return
    }
    catch (e) {
        throw e
    }
}