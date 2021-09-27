const Purchase = require("../database/schemas/purchaseSchema")

//create a purchase
module.exports.createPurchase = async (purchase) => {
    const newPurchase = await Purchase.create(
            {
                    vendor_id: "613eb365af0d5b2c142fa326",
                    status: "open",
                    totalItems: 1,
                    totalCost: 100,
                    products: [
                        {
                            product_id: '61508a057d1c072df4112bb6',
                            price: 100,
                            items: 1,
                        }
                    ],
                    discount: 0,
            }
    );
    return newPurchase;
}
// get a purchase
module.exports.getPurchase = (id) => {
    return Purchase.findOne({_id: id});
}