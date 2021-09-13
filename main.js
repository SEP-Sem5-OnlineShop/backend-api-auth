// read variables in .env
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connection = require("./database/connection")
const apiRoutes = require("./routes/auth")
const appRoutes = require("./routes/app")
const cookieParser = require("cookie-parser")

const PORT = Number(process.env.PORT) || 8000
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:3000', credentials: true}))

// connect db
connection.connect().then(() => {console.log('Connected to the db!')})
app.get('/', (req, res) => {
    res.status(200).send({
        message: process.env.DB_USER
    })
})
app.get('/dashboard', (req, res) => {
    res.status(200).send({
        message: "This is dashboard"
    })
})
app.use('/api', [apiRoutes, appRoutes])

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))