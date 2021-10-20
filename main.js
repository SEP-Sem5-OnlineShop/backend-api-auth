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
const initializeSocket = require("./socket/index")
const locationChangeStream = require("./database/change-streams/location")

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
initializeSocket(io)

// connect db
connection.connect().then(() => {
    console.log('Connected to the db!')
})
app.use('/api', [apiRoutes, appRoutes])

locationChangeStream.on('change', change => {
    console.log(change)
})

httpServer.listen(PORT, () => console.log(`Listening at port ${PORT}`))