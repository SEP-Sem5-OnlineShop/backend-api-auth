const Location = require("./schemas/locationSchema")
const locationModel = require("../models/locaiton")

module.exports = (io) => {

    Location.watch().on("change", async (change) => {
        console.log(change)
        let data, error
        try {
            const locationData = await locationModel.getLocation(change.documentKey ? change.documentKey._id || "" : "")
            locationData ? data = {
                user_id: locationData["user_id"],
                coordinates: locationData["location"]["coordinates"],
                loginStatus: locationData["loginStatus"]
            } : {}
        }
        catch (e) {
            error = e.message
        }
        io.emit("driver:update-location", data || error)
    })


}