const mongoose = require("mongoose");
const connection_url = `mongodb+srv://admin:SPHS41nip3XYHyFB@cluster0.469sv.mongodb.net/online_shop_db?retryWrites=true&w=majority`

/**
 * Connect backend api to the database
 * @returns {Promise<void>}
 */
async function connect () {
    return await mongoose.connect(connection_url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
}
// const users = require('./userSeeder')
// const alerts = require('./alertSeeder')
// const purchases = require('./purchaseSeeder')
// const products = require('./productSeeder')
connect().then(() => {console.log("connected")})
const locations = require('./locationSeeder')

// const seeds = [...users,...alerts,...purchases,...products]
const seeds = [...locations]

let done = 0

seeds.forEach(item => {
    item.save((error, result) => {
        done++
        console.log(error)
        if(done === seeds.length) mongoose.disconnect().then(r => {console.log("disconnected")})
    })
})
