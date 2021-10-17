const alertHandler = require("./name-sapces/alert")
const driverHandler = require("./name-sapces/driver")
const { v4: uuidv4 } = require("uuid")

const main = (io) => {

    const sessionStorage = new Map()

    const alertNameSpace = io.of("/alert")

    // if the user is logged into the system create a separate room for the user
    alertNameSpace.on("connection", (socket) => {
        socket.on("join", (data) => {
            socket.join(data.userId)
        })
    })

    alertNameSpace.on("connection", (socket) => {
        alertHandler(alertNameSpace, socket)
    });

    const driverNameSpace = io.of("/driver")

    driverNameSpace.use((socket, next) => {
        const sessionID = socket.handshake.auth.sessionID;
        if (sessionID) {
            // find existing session
            const session = sessionStorage.get("sessionID");
            if (session) {
                socket.sessionID = sessionID;
                socket.userID = session.userID;
                socket.username = session.username;
                return next();
            }
        }
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("invalid username"));
        }
        // create new session
        socket.sessionID = uuidv4();
        socket.userID = socket.handshake.auth.userID;
        socket.username = username;
        sessionStorage.set("sessionID", socket)
        next();
    });

    driverNameSpace.on("connection", socket => {
        socket.emit("driver:session", {
            sessionID: socket.sessionID,
        });
        driverHandler(driverNameSpace, socket)
    })
}

module.exports = main