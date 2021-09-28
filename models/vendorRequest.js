const VendorRequest = require("../database/schemas/vendorRequest")
const Vendor = require("../database/schemas/userSchema")
/**
 * Create a user
 * @param data
 */
module.exports.createRequest = (data) => {
        return new VendorRequest({
            fullName: data.fullName,
            telephone: data.telephone,
            email: data.email,
            nic: data.nic,
            address:  data.address,
            shopName: data.shopName,
            permitId: data.permitId,
            regionToBeCovered: data.regionToBeCovered,
            numberOfVehicles: data.numberOfVehicles,
            vehicles: data.vehicles,
            imageUrls: data.imageUrl,
            status: "pending"
        });
}

// get a user
module.exports.getRequest= (id) => {
        return VendorRequest.findOne({_id: id})
}

module.exports.getRequestByTelephoneNumber = async (telephone) => {
        return VendorRequest.findOne({telephone: telephone});
}

// get vendor requests
module.exports.getRequests = async () => {
        // return await Vendor.find({ "role":"customer" }).select("-password")
        return VendorRequest.find({});
        // return Vendor.find({role: {$elemMatch :"vendor"}})
    }

// get vendor request by email
module.exports.getRequestByEmail = async (email) => {
        return VendorRequest.findOne({email: email});
    }

// update user
module.exports.updateRequest = async (data) => {
        return VendorRequest.updateOne({email: data.email}, {
            fullName: data.fullName,
            telephone: data.telephone,
            email: data.email,
            nic: data.nic,
            address: data.address,
            shopName: data.shopName,
            permitId: data.permitId,
            regionToBeCovered: data.regionToBeCovered,
            numberOfVehicles: data.numberOfVehicles,
            vehicles: data.vehicles,
            imageUrls: data.imageUrl
        });
}

// delete user