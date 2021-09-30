const Vehicle = require('../models/vehicle')

const VehicleController = {
    create: async (req, res, next) => {
        try {
            await Vehicle.create(req.body)
            return res.status(200).send({
                message: "Success",
                data: "Successfully added a vehicle!"
            })
        }
        catch (e) {
            return res.status(400).send({
                message: "Failed",
                data: "Something went wrong!"
            })
        }
    }
}