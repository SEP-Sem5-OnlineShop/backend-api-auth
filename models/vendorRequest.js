const VendorRequest = require("../database/schemas/vendorRequest")
const Vendor = require("../database/schemas/userSchema")
/**
 * Create a user
 * @param data
 */
module.exports.createRequest = (data) => {
        return new VendorRequest({
            firstName: data.firstName,
            lastName: data.lastName,
            telephone: data.telephone,
            email: data.email,
            nic: data.nic,
            address:  data.address,
            shopName: data.shopName,
            permitId: data.permitId,
            regionToBeCovered: data.regionToBeCovered,
            numberOfVehicles: data.numberOfVehicles,
            vehicles: data.vehicles,
            imageUrl: data.imageUrl,
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
        return VendorRequest.find({'status':'pending'});
        // return Vendor.find({role: {$elemMatch :"vendor"}})
    }

// get vendor request by email
module.exports.getRequestByEmail = async (email) => {
        return VendorRequest.findOne({email: email});
    }

// update user
module.exports.updateRequest = async (data) => {
        console.log(data)
        return VendorRequest.updateOne({email: data.email}, {
            firstName: data.fullName,
            lastName: data.fullName,
            telephone: data.telephone,
            email: data.email,
            nic: data.nic,
            address: data.address,
            shopName: data.shopName,
            permitId: data.permitId,
            regionToBeCovered: data.regionToBeCovered,
            numberOfVehicles: data.numberOfVehicles,
            vehicles: data.vehicles,
            imageUrl: data.imageUrl
        });
}

// update status after the create
module.exports.updateStatus = async (id) => {
        // const st=(VendorRequest.findOne({_id:id}))
        // console.log(st.status)
        console.log('this id-',id)
        return VendorRequest.updateOne({_id: id}, 
                {'status':'accepted'}, function (err) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs");
                }
            });
}

// reject a vendor reques
module.exports.rejectRequest = async (id) => {
        // const st=(VendorRequest.findOne({_id:id}))
        // console.log(st.status)
        console.log('this id-',id)
        return VendorRequest.updateOne({_id: id}, 
                {'status':'rejected'}, function (err) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs");
                }
            });
}

module.exports.getEmail = (id) => {
    return VendorRequest.findOne({_id: id},'email').exec()
    // return Product.find({_id: id})
}