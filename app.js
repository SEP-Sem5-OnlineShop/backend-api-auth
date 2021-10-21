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

app.use(cors())
// app.use(cors(corsOptions))

app.use('/api', [apiRoutes, appRoutes])
app.get('/home', function (req,res,next) {
    return res.status(200).send({})
})

module.exports = app