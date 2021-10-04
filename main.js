// read variables in .env
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connection = require("./database/connection")
const apiRoutes = require("./routes/auth")
const appRoutes = require("./routes/app")
const cookieParser = require("cookie-parser")
const { createServer } = require("http");
const { Server } = require("socket.io");
const alertHandler = require("./socket/index")

const PORT = Number(process.env.PORT) || 8000

const app = express();
const httpServer = createServer(app);

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const corsOptions = {
    origin: function (origin, callback) {
        if (['http://localhost:3000', 'https://ontheway-sep.netlify.app'].indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

app.use(cors(corsOptions))
// app.use(cors())

// socket instance
const io = new Server(httpServer, {cors : corsOptions});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    const role = socket.handshake.auth.role
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    socket.role = role;
    next();
});

io.on("connection", (socket) => {
    console.log("bla")
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    console.log(users)
    socket.emit("users", users);
    socket.on("remove-user", (arg) => {
        console.log(arg)
    })
    alertHandler(io, socket)
    // ...
});



// connect db
connection.connect().then(() => {console.log('Connected to the db!')})
app.use('/api', [apiRoutes, appRoutes])

httpServer.listen(PORT, () => console.log(`Listening at port ${PORT}`))