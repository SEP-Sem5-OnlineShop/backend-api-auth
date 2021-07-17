// read variables in .env
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connection = require("./database/connection")
const validator = require("./middlewares/validator")
const User = require("./models/user")

const PORT = Number(process.env.PORT) || 8000
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// connect db
connection.connect().then(() => {console.log('Connected to the db!')})

app.get("/", (req, res) => {
    res.send('Hello world!')
})
app.post("/register", validator.userSchemaValidator, (req, res) => {
    const user = User.createUser(req.body)
    user.save(error => {
        res.status(400).send({message: error})
    })
})

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))