const alertController = require("../../controllers/alertController")

module.exports = (io, socket) => {

    const createAlert = (payload) => {
        socket.to(payload.room).emit("alert:set", payload.payload)
    }
    const removeAlert = (payload) => {
        socket.to(payload.room).emit("alert:unset", payload.payload)
    }

    // const readAlert = (orderId, callback) => {
    //
    // }

    socket.on("alert:create", createAlert);
    socket.on("alert:remove", removeAlert);
    // socket.on("alert:read", readAlert);
}