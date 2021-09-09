const User = require('../schemas/userSchema')

const users = [
    new User({
        userId: 'a0000',
        firstName: 'Darshana',
        lastName: 'Sandaruwan',
        telephone: '0712345678',
        role: "admin",
        email: "darshana@gmail.com",
        password: "123456",
    }),
    new User({
        userId: 'c0000',
        firstName: 'customerf1',
        lastName: 'customerl1',
        telephone: '0712345679',
        role: "customer",
        customer: {
            location: {
                type: "Point",
                coordinates: [75.021, 6.235]
            }
        },
        email: "customer1@gmail.com",
        password: "123456",
    }),
]

module.exports = users