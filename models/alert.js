const bcrypt = require("bcrypt")

const User = require("../database/schemas/alertSchema")
const Alert = require("../database/schemas/alertSchema")
const Location = require("../database/schemas/locationSchema")

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


module.exports.setAlert = async (customer_id,product_id) => {
        const newAlert = await Alert.create(
                {
                        user_id: customer_id,
                        product_id: product_id
                }
        );
        return newAlert;
}
module.exports.removeAlert = async (customer_id,product_id) => {
        const removeAlert = await Alert.findOneAndDelete(
                {
                        user_id: customer_id,
                        product_id: product_id
                }
        );
        return removeAlert;
}
module.exports.getdetailsAlert = async (customer_id,product_id) => {
        return Alert.findOne({user_id: customer_id, product_id: product_id});
}
module.exports.getCustomerAlertList = async (customer_id) => {
        return Alert.find({user_id: customer_id});
}
module.exports.getDriverAlertList = async (driver_id) => {
        const start = new Date()
        start.setHours(0, 0, 0, 0)

        const end = new Date()
        end.setHours(23, 59, 59, 999)
        const customers = await Alert.find(
            {
                    driver_id: driver_id,
            },
            'user_id'
            )
        const customerIds = []
        if(customers) {
                customers.forEach(customer => {
                        customerIds.push(customer['user_id'])
                })
        }
        console.log(customerIds)
        return Location.find(
            {user_id: customerIds},
            {user_id: 1, location: 1}
        )

}