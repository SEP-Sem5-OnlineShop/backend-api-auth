const alertController = require("../controllers/alertController")

module.exports = (io, socket) => {
    const createAlert = (payload) => {
        socket.emit("alert:set", () => alertController.socket.setAlert(payload))
    }
    const removeAlert = (payload) => {
        console.log(payload, "remove-alert")
    }

    const readAlert = (orderId, callback) => {
        // ...
    }

    socket.on("alert:create", createAlert);
    socket.on("alert:remove", removeAlert);
    socket.on("alert:read", readAlert);
}