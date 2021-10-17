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