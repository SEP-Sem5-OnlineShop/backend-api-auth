require("dotenv").config()

const mongoose = require("mongoose")
const DB_USER = process.env.DB_USER || ''
const DB_PASSWORD = process.env.DB_PASSWORD || ''

/**
 * Connection url given by the mongodb cluster
 * @type {string}
 */
const connection_url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.469sv.mongodb.net/online_shop_db?retryWrites=true&w=majority`

/**
 * Connect backend api to the database
 * @returns {Promise<void>}
 */
exports.connect = async function () {
    await mongoose.connect(connection_url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
}