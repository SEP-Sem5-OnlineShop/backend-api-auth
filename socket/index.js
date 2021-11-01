const alertHandler = require("./name-sapces/alert")
const driverHandler = require("./name-sapces/driver")
const mapHandler = require("./name-sapces/map")

const initializeChangeStreams = require("../database/changeStreams")
const { v4: uuidv4 } = require("uuid")

const main = (io) => {

    const sessionStorage = new Map()

    const driverNameSpace = io.of("/driver")
    const mapNameSpace = io.of("/map")

    driverNameSpace.use((socket, next) => {
        const sessionID = socket.handshake.auth.sessionID;
        console.log(sessionID, "outside if statement")
        if (sessionID) {
            // find existing session
            const session = sessionStorage.get(sessionID);
            console.log(session, "test")
            if (session) {
                socket.sessionID = sessionID;
                socket.userID = session.userID;
                socket.username = session.username;
                console.log(sessionID, session.userID, "inside if statement")
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
        sessionStorage.set([socket.sessionID], socket)
        next();
    });

    driverNameSpace.on("connection", socket => {
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