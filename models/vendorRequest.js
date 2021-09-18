const VendorRequest = require("../database/schemas/vendorRequest")

/**
 * Create a user
 * @param data
 */
module.exports.createRequest = async (data) => {
        console.log(data)
        return await new VendorRequest({
            fullName: data.name,
            telephone: data.telephoneNumber,
            nic: data.nicNumber,
            address:  data.address,
            shopName: data.shopName,
            permitId: data.permitId,
            regionToBeCovered: data.region,
            numberOfVehicles: data.vehicles,
            vehicleNumber: data.vehicleNo1,
        });
}

// get a user
module.exports.getUser = (telephone) => {
        return User.findOne({telephone: telephone})
}

// get users

// update user

// delete user