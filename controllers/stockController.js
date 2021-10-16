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
            const result = await Stock.update(req.body)
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
            const result = await Stock.get(req.params.id)
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
    }
}

module.exports = StockController