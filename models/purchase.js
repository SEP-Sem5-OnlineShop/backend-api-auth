const Purchase = require("../database/schemas/purchaseSchema")

//create a purchase
module.exports.createPurchase = async (purchase) => {
    const newPurchase = await Purchase.create(
            {
                    vendor_id: "613eb365af0d5b2c142fa326",
                    customer_id: "613eba8b94acbe3710fed690",
                    status: "open",
                    totalItems: 1,
                    totalCost: 100,
                    products: [
                        {
                            product_id: '614ed9a74629cf154cb8d335',
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
// get a purchase
module.exports.getCustomerPurchaseList = (customer_id) => {
    return Purchase.find({customer_id: customer_id});
}
module.exports.addReview = (purchase_id,product_id,review) => {
    return Purchase.findOneAndUpdate(
        { "_id": purchase_id, "products.product_id": product_id },
        { 
            "$set": {
                "products.$.rating": review.rating,
                "products.$.review": review.review,
            }
        },
        {useFindAndModify: false}
    );
}