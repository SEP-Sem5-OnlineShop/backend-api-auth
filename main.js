// read variables in .env
require("dotenv").config()

const connection = require("./database/connection")
const { createServer } = require("http");
const { Server } = require("socket.io");
const initializeSocket = require("./socket/index")
const app = require('./app')

const PORT = 80

const httpServer = createServer(app);

const corsOptions = {
    origin: function (origin, callback) {
        if (['http://localhost:3000', 'https://ontheway-sep.netlify.app', 'https://sandbox.payhere.lk'].indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
// connect db
connection.connect().then(() => {console.log('Connected to the db!')})

// socket instance
const io = new Server(httpServer, {cors : corsOptions});
initializeSocket(io)

httpServer.listen(PORT, () => console.log(`Listening at port ${PORT}`))