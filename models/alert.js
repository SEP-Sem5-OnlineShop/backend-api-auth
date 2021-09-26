const bcrypt = require("bcrypt")

const User = require("../database/schemas/alertSchema")
const Alert = require("../database/schemas/alertSchema")

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
                        product_id: product_id,
                }
        );
        return newAlert;
}
module.exports.getCustomerAlertList = async (id) => {
        return Alert.find({user_id: id});
        // return Alert.find({});
}
module.exports.getdetailsAlert = async (customer_id,product_id) => {
        // const createdAlerts = await Alert.insertMany([
        //         {
        //                 user_id: '613ebc89c71d2e07e0ec5e93',
        //                 product_id: '614ed9ac4629cf154cb8d344',
        //         }
        // ]);
        
        return Alert.findOne({user_id: customer_id, product_id: product_id});
}