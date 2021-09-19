const VendorRequest = require("../database/schemas/vendorRequest")
const Vendor = require("../database/schemas/userSchema")
/**
 * Create a user
 * @param data
 */
module.exports.createRequest = (data) => {
        return new VendorRequest({
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

// get vendor requests
module.exports.getRequests = async () => {
        // return await Vendor.find({ "role":"customer" }).select("-password")
        return await VendorRequest.find({})
        // return Vendor.find({role: {$elemMatch :"vendor"}})
    }
// update user

// delete user