const alertHandler = require("./name-sapces/alert")
const driverHandler = require("./name-sapces/driver")
const mapHandler = require("./name-sapces/map")

const InMemorySessionStore = require("./sessionStore")

const initializeChangeStreams = require("../database/changeStreams")
const { v4: uuidv4 } = require("uuid")

const main = (io) => {

    const sessionStore = new InMemorySessionStore()

    const driverNameSpace = io.of("/driver")
    const mapNameSpace = io.of("/map")

    driverNameSpace.use((socket, next) => {
        const sessionID = socket.handshake.auth.sessionID;
        if (sessionID) {
            // find existing session
            const session = sessionStore.findSession(sessionID)
            console.log(session, "reconnected")
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
        next();
    });

    driverNameSpace.on("connection", socket => {
        socket.on("disconnect", async () => {
            const matchingSockets = await driverNameSpace.in(socket.userID).allSockets()
            const isDisconnected = matchingSockets.size === 0
            if (isDisconnected) {
                // update the connection status of the session
                sessionStore.saveSession(socket.sessionID, {
                    userID: socket.userID,
                    username: socket.username,
                    connected: false,
                });
            }
        })
        socket.emit("driver:session", {
            sessionID: socket.sessionID,
        });
        socket.on("join", (data) => {
            socket.join(data.userId)
        })
        driverHandler(driverNameSpace, socket)
        alertHandler(driverNameSpace, socket)
        mapHandler(mapNameSpace, socket)
    })

    initializeChangeStreams(driverNameSpace)
}

module.exports = main