const Alert = require("../database/schemas/alertSchema")

/**
 * Create a alert
 * @param data
 */
// module.exports.createAlert = async () => {
//         const salt = await bcrypt.genSalt(10)
//         const hashPassword = await bcrypt.hash(data.password, salt)
//         return new User({
//                 user_id: "abc12345",
//                 product_id:"bcd123",
//                 status: "sent",
//                 setTime: "2020-08-31 12:00",
//                 updateTime: "2020-08-31 12:02",
                
//         });
// }


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
        const removeAlert = await Alert.deleteOne(
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