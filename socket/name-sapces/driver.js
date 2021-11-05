const driverModel = require("../../models/driver")
const InMemorySessionStore = require("../sessionStore")

module.exports = (io, socket) => {
    const role = socket.handshake.auth.role
    const setLogin = async (payload) => {
        try {
            if(role === "driver") {
                console.log("driver logged in", payload.userId)
                await driverModel.updateLoginStatus(payload.userId, "login")
                io.emit("driver:showLogin", payload.userId)
            }
        }
        catch (e) {
        }
    }
    const setLogout = async (payload) => {
        try {
            if(role === "driver") {
                console.log("driver logged out", payload.userId)
                await driverModel.updateLoginStatus(payload.userId, "logout")
                io.emit("driver:showLogout", payload.userId)
            }
        }
        catch (e) {

        }
    }

    socket.on("driver:login", setLogin)
    socket.on("driver:logout", setLogout)
}