const mongoose = require('mongoose')
const connection = require('../connection')
connection.connect().then(() => {console.log('Connected to the db!')})
const users = require('./userSeeder')
const alerts = require('./alertSeeder')
const purchases = require('./purchaseSeeder')

const seeds = [...users,...alerts,...purchases]

let done = 0

seeds.forEach(item => {
    item.save((error, result) => {
        done++
        console.log(error)
        if(done === users.length) mongoose.disconnect()

    })
})

