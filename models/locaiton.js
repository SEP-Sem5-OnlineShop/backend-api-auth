const Location = require("../database/schemas/locationSchema")

module.exports.updateLocation = async (user_id, coordinates) => {
    try {
        await Location.updateOne(
            { user_id: user_id },
            {
                $set: {
                    'location.coordinates': coordinates
                }
            }
        )
    }
    catch (e) {
        throw e
    }
}

module.exports.getLocation = async (_id) => {
    return Location.findOne(
        {_id: _id}
    );
}