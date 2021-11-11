const Purchase = require("../database/schemas/purchaseSchema");
const DailyStock = require("../database/schemas/dailyStockSchema");

//create a purchase
module.exports.createPurchase = async (vendor_id,products,dailystock_id) => {
    let p = [];
    let c = 0;
    for (var i in products) {
        p[c] = {product_id: products[i].productId , price:products[i].price , items:products[i].items };
        c += 1;
    }
    let totItem = 0;
    let totCost = 0;
    // console.log(p);
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

    p.map(async (item) => {
        await DailyStock.findOneAndUpdate(
            { "_id": dailystock_id, "dailyStock.productId": item.product_id },
            { 
                "$inc": {
                    "dailyStock.$.stock": -item.items,
                }
            },
            {useFindAndModify: false}
        );
    })

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

module.exports.getVendorPurchaseList = (vendor_id) => {
  return Purchase.find({vendor_id: vendor_id});
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

module.exports.getPurchaseCount = async () => {
    var tomorrow = new Date();
    var today = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)
    today.setHours(0,0,0,0);
    tomorrow.setHours(0,0,0,0);
    // console.log(tomorrow)
    // console.log(today)
    return await Purchase.countDocuments({ createdAt :  { $gt: today, $lt: tomorrow } }).exec();
    // console.log(date);
    
}

module.exports.getLastPurchaseDay1 = async () => {
    var day1 = new Date();
    var day2 = new Date();

    day2.setDate(day2.getDate() +1)

    day1.setHours(0,0,0,0);
    day2.setHours(0,0,0,0);

    const purchases1= Purchase.countDocuments({ createdAt :  { $gt: day1, $lt: day2 } }, function (err, count) {
        console.log( count);
      }).exec();
      

    //   console.log(purchases1)
      return purchases1;
}

module.exports.getLastPurchaseDay2 = async () => {
    var day1 = new Date();
    var day3 = new Date();

    day3.setDate(day3.getDate() -1)

    day1.setHours(0,0,0,0);
    day3.setHours(0,0,0,0);

      const purchases2= Purchase.countDocuments({ createdAt :  { $gt: day3, $lt: day1 } }, function (err, count) {
        console.log( count);
      }).exec();
      
    //   console.log(purchases2)
      return purchases2;
}

module.exports.getLastPurchaseDay3 = async () => {
    var day1 = new Date();
    var day2 = new Date();

    day1.setDate(day1.getDate() -1)
    day2.setDate(day2.getDate() -2)

    day1.setHours(0,0,0,0);
    day2.setHours(0,0,0,0);

      const purchases2= Purchase.countDocuments({ createdAt :  { $gt: day2, $lt: day1 } }, function (err, count) {
        console.log( count);
      }).exec();
      
    //   console.log(purchases2)
      return purchases2;
}

module.exports.getLastPurchaseDay4 = async () => {
    var day1 = new Date();
    var day2 = new Date();

    day1.setDate(day1.getDate() -2)
    day2.setDate(day2.getDate() -3)

    day1.setHours(0,0,0,0);
    day2.setHours(0,0,0,0);

      const purchases2= Purchase.countDocuments({ createdAt :  { $gt: day2, $lt: day1 } }, function (err, count) {
        console.log( count);
      }).exec();
      
    //   console.log(purchases2)
      return purchases2;
}

module.exports.getLastPurchaseDay5 = async () => {
    var day1 = new Date();
    var day2 = new Date();

    day1.setDate(day1.getDate() -3)
    day2.setDate(day2.getDate() -4)

    day1.setHours(0,0,0,0);
    day2.setHours(0,0,0,0);

      const purchases2= Purchase.countDocuments({ createdAt :  { $gt: day2, $lt: day1 } }, function (err, count) {
        console.log( count);
      }).exec();
      
    //   console.log(purchases2)
      return purchases2;
}

module.exports.notify = (det) => {
    return Purchase.findOneAndUpdate(
        { _id: det.order_id},
        { status: "closed",},
        {useFindAndModify: false}
    );
}