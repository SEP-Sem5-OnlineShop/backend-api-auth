const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const apiRoutes = require("./routes/auth")
const appRoutes = require("./routes/app")

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const allowList = ['http://localhost:3000', 'https://ontheway-sep.netlify.app', 'https://admin-ontheway-sep.netlify.app']
// const corsOptions = {
//     origin: function (origin, callback) {
//         console.log(origin)
//         if (allowList.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     credentials: true
// }

const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowList.indexOf(req.header('Origin')) !== -1) corsOptions = {origin: true, credentials: true}
    else corsOptions = {origin: false}
    callback(null, corsOptions)
}

// app.use(cors())
app.use(cors(corsOptionsDelegate))

app.use('/api', [apiRoutes, appRoutes])

module.exports = app