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
            nic: data.nic,
            address:  data.address,
            shopName: data.shopName,
            permitId: data.permitId,
            regionToBeCovered: data.regionToBeCovered,
            numberOfVehicles: data.vehicles.length,
            vehicles: data.vehicles,
            imageUrls: data.imageUrl
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

// update user
module.exports.updateRequest = async (telephone, data) => {
        return VendorRequest.updateOne({telephone: telephone}, {
            fullName: data.fullName,
            telephone: data.telephone,
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

// update status after the create
module.exports.updateStatus = async (id) => {
        // console.log(VendorRequest.findOne({_id:id}))
        return VendorRequest.updateOne({_id:id}, {
            status:"accepted"
        }, function (err) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs  ");
                }
        });
}