const Purchase = require('../schemas/purchaseSchema')

const Purchases = [
    new Purchase({
        user_id: "abc12345",
        vendor_id:"bcd123",
        product_id:"bcd00",
        total_amount: "100",
        Discount: "50%",
        dateTime: "2020-08-31 12:02",
    }),
    new Purchase({
        user_id: "abc0000",
        vendor_id:"bcd123",
        product_id:"bcd00",
        total_amount: "100",
        Discount: "50%",
        dateTime: "2020-08-31 12:02",
    }),
]

module.exports = Purchases