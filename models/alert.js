const bcrypt = require("bcrypt")

const User = require("../database/schemas/alertSchema")

/**
 * Create a alert
 * @param data
 */
module.exports.createAlert = async () => {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(data.password, salt)
        return new User({
                user_id: "abc12345",
                product_id:"bcd123",
                status: "sent",
                setTime: "2020-08-31 12:00",
                updateTime: "2020-08-31 12:02",
                
        });
}

// get a alert


