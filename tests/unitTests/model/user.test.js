const mockingoose = require('mockingoose');
const UserSchema = require("../../../database/schemas/userSchema")
const {
    createUser,
    getUserByTelephone,
    getUserByEmail,
    getUserById,
    updatePassword
} = require('../../../models/user');

describe('user', () => {
    // describe('createUser', () => {
    //     it ('should return created user', async () => {
    //         mockingoose(UserSchema).toReturn(
    //             {
    //             _id: '614f6ab86728ee0a9450195c',
    //             firstName: 'John',
    //             lastName: 'fdasfadsf',
    //             telephone:'0712345678',
    //             role: 'vendor',
    //             email: 'g@gmail.com',
    //             }, 'findOne');
    //         const results = await getUserByTelephone('0712345678');
    //         expect(results.firstName).toBe('John');
    //     });
    // });

    describe('getUserByTelephone', () => {
        it ('should return relevant user', async () => {
            mockingoose(UserSchema).toReturn(
                {
                _id: '614f6ab86728ee0a9450195c',
                firstName: 'John',
                lastName: 'fdasfadsf',
                telephone:'0712345678',
                role: 'vendor',
                email: 'g@gmail.com',
                }, 'findOne');
            const results = await getUserByTelephone('0712345678');
            expect(results.firstName).toBe('John');
        });
    });

    describe('getUserByEmail', () => {
        it ('should return relevant user', async () => {
            mockingoose(UserSchema).toReturn(
                {
                _id: '614f6ab86728ee0a9450195c',
                firstName: 'John',
                lastName: 'fdasfadsf',
                telephone:'0712345678',
                role: 'vendor',
                email: 'g@gmail.com',
                }, 'findOne');
            const results = await getUserByEmail('g@gmail.com');
            expect(results.firstName).toBe('John');
        });
    });

    describe('getUserById', () => {
        it ('should return relevant user', async () => {
            mockingoose(UserSchema).toReturn(
                {
                    _id: '614f6ab86728ee0a9450195c',
                    firstName: 'John',
                    lastName: 'fdasfadsf',
                    telephone:'0712345678',
                    role: 'vendor',
                    email: 'g@gmail.com',
                }, 'findOne');
            const results = await getUserById('614f6ab86728ee0a9450195c');
            expect(results.firstName).toBe('John');
        });
    });

    describe('updatePassword', () => {
        it ('should update password', async () => {
            mockingoose(UserSchema).toReturn(
                {
                    _id: '614f6ab86728ee0a9450195c',
                    firstName: 'John',
                    lastName: 'fdasfadsf',
                    telephone:'0712345678',
                    role: 'vendor',
                    email: 'g@gmail.com',
                    password: 'abcdef'
                }, 'updateOne');
            const results = await updatePassword('614f6ab86728ee0a9450195c','12345');
            expect(results._id).toBe('614f6ab86728ee0a9450195c');
        });
    });
});