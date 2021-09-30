const Purchase = require("../database/schemas/purchaseSchema")

//create a purchase
module.exports.createPurchase = async (vendor_id,products) => {
    let p = [];
    let c = 0;
    for (var i in products) {
        p[c] = {product_id: products[i]._id , price:products[i].price , items:products[i].items };
        c += 1;
    }
    let totItem = 0;
    let totCost = 0;
    console.log(p);
    for (var x in p){
        totItem += p[x].items;
        totCost += p[x].items*p[x].price;
    }
    const newPurchase = await Purchase.create(
            {
                vendor_id: vendor_id,
                status: "open",
                totalItems: totItem,
                totalCost: totCost,
                products: p,
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
module.exports.payPurchase = (order_id,customer_id) => {
    return Purchase.findOneAndUpdate(
        { _id: order_id},
        { customer_id: customer_id, status: "closed",},
        {useFindAndModify: false}
    );
}