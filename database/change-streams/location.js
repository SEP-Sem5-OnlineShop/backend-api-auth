const Location = require("../schemas/locationSchema")
const pipeline = [
    {
        $match: {
            $or: [{ operationType: 'insert' }, { operationType: 'update' }]
        },
    }
]
module.exports = Location.watch(pipeline)