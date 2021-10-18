const locationModel = require("../schemas/locationSchema")
const mongoose = require("mongoose");

const locations = [
    new locationModel({
        user_id: mongoose.Types.ObjectId("613eba8b94acbe3710fed690"),
        location: {
            type: "Point",
            coordinates: [6.7324, 81.1345]
        },
        loginStatus: "login"
    }),
    new locationModel({
        user_id: mongoose.Types.ObjectId("61559c6de403553fb8f2a3ca"),
        location: {
            type: "Point",
            coordinates: [6.7377, 81.1031]
        },
        loginStatus: "login"
    }),
    new locationModel({
        user_id: mongoose.Types.ObjectId("616cc9f61f509f1fc8b8a828"),
        location: {
            type: "Point",
            coordinates: [6.7325, 81.1168]
        },
        loginStatus: "login"
    }),
]

module.exports = locations