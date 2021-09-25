const User = require('../database/schemas/userSchema')
const { mongoose } = require('../database/connection')

module.exports.createDriver = async (vendorId, data) => {
    let session;
    if (vendorId && data) {
        session = await mongoose.connection.startSession()
        try {
            await session.withTransaction(async () => {
                const driver = new User({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    telephone: data.telephone,
                    role: "driver",
                    driver: {
                        licenseNumber: data.licenseNumber,
                        licenseFileUrl: data.licenseFileUrl,
                        vendorId: vendorId
                    }
                })
                await driver.save()
                await User.updateOne({ _id: vendorId },
                    {
                        $push: {
                            'vendor.drivers': data
                        }
                    })
            })
        }
        catch (e) {
            throw e
        }
        finally {
            session.endSession()
        }
    }
}