const Alert = require('../schemas/alertSchema')

const Alerts = [
    new Alert({
        user_id: "abc12345",
        product_id:"bcd123",
        status: "sent",
        setTime: "2020-08-31 12:00",
        updateTime: "2020-08-31 12:02",
    }),
    new Alert({
        user_id: "k00000",
        product_id:"bcd00",
        status: "sent",
        setTime: "2020-08-31 12:00",
        updateTime: "2020-08-31 12:02",
    }),
]

module.exports = Alerts