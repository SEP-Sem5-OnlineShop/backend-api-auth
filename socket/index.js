const alertHandler = require("./name-sapces/alert")
const main = (io) => {

    const alertNameSpace = io.of("/alert")

    // check the user have logged into the system
    alertNameSpace.use((socket, next) => {
        const role = socket.handshake.auth.role
        if (!role || role === "guest") {
            return next(new Error("invalid username"));
        }
        next();
    });

    // if the user is logged into the system create a separate room for the user
    alertNameSpace.on("connection", (socket) => {
        socket.on("join", (data) => {
            socket.join(data.userId)
        })
    })

    alertNameSpace.on("connection", (socket) => {
        alertHandler(alertNameSpace, socket)
    });
}

module.exports = main