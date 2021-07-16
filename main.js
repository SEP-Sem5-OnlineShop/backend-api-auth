// read variables in .env
require("dotenv").config()

const express = require("express")
const cors = require("cors")

const PORT = Number(process.env.PORT) || 8000
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/", (req, res) => {
    res.send('Hello world!')
})

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))