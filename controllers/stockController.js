const Stock = require("../models/stock")

const StockController = {
    create: async (req, res, next) => {
        try {
            const result = await Stock.create(req.body)
            return res.status(200).send({
                message: "Success",
                data: "Successfully added today stock!"
            })
        }
        catch(e) {
            console.log(e)
            return res.status(400).send({
                message: "Failed",
                data: "Check your internet connection!"
            })
        }
    },
    update: async (req, res, next) => {
        try {
            const result = await Stock.update(req.body.vendorId, req.body.vehicleId, req.body)
            return res.status(200).send({
                message: "Success",
                data: "Successfully updated today stock!"
            })
        }
        catch(e) {
            console.log(e)
            return res.status(400).send({
                message: "Failed",
                data: "Check your internet connection!"
            })
        }
    },
    get: async (req, res, next) => {
        try {
            const result = await Stock.get(req.body.vendorId, req.body.vehicleId)
            return res.status(200).send({
                message: "Success",
                data: result
            })
        }
        catch(e) {
            return res.status(400).send({
                message: "Failed",
                data: "Check your internet connection!"
            })
        }
    },
    getDriverSellProductList: async function(req, res, next) {
        console.log(req.params);
        try{
            console.log(req.params);
            const dailystock = await Stock.getDriverSellProductList(req.params.vendor_id);
            res.status(200).send(dailystock);
        } catch (error) {
            console.log("error error error")
            res.status(401).send(error);
        }
    }
}

module.exports = StockController