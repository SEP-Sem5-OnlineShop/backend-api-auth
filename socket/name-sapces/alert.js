const Driver = require("../../models/driver")
module.exports = (io, socket) => {

    const createAlert = async (payload) => {
        const driverId = await Driver.getRelevantDriver(
            payload.payload.productId,
            payload.payload.vendor_id,
            payload.payload.customer._id,
            payload.payload.alertId
        )
        console.log(driverId)
        socket.to(driverId).emit("alert:set", payload.payload)
    }
    const removeAlert = (payload) => {
        socket.to(payload.payload.driver_id).emit("alert:unset", payload.payload)
    }

    // const readAlert = (orderId, callback) => {
    //
    // }

    socket.on("alert:create", createAlert);
    socket.on("alert:remove", removeAlert);
    // socket.on("alert:read", readAlert);
}