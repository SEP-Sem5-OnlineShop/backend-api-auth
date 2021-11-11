const VendorRequest = require("../database/schemas/vendorRequest")
const Vendor = require("../database/schemas/userSchema")
/**
 * Create a user
 * @param data
 */
module.exports.createRequest = (data) => {
        return new VendorRequest({
            ...data,
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
        // console.log(data)
        return VendorRequest.replaceOne({email: data.email}, data);
}

// update status after the create
module.exports.updateStatus = async (id) => {
        // const st=(VendorRequest.findOne({_id:id}))
        // console.log(st.status)
        // console.log('this id-',id)
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
        // console.log('this id-',id)
        return VendorRequest.updateOne({_id: id}, 
                {'status':'rejected'}, function (err) {
                if (err){
                    console.log(err)
                }
                else{
                    // console.log("Updated Docs");
                }
            });
}

module.exports.getEmail = (id) => {
    return VendorRequest.findOne({_id: id},'email').exec()
    // return Product.find({_id: id})
}