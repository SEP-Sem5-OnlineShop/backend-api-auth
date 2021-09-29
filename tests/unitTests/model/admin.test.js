const adminSchema= require('../../../database/schemas/userSchema');
const mockingoose = require('mockingoose');
const adminModel=require('../../../models/admin')
// test('giving id 6152a6a13c07a2ce71c6ca85 expects admin', () => {
//     const obj=admin.getAdmin('6152a6a13c07a2ce71c6ca85')
//     // console.log(obj)
//     expect(obj);
// });


describe('Admin actions', () => {
    describe('getAdmin', () => {
        it ('should return a admin', async () => {
          mockingoose(adminSchema).toReturn(
            {
              _id: '614f3b459a76f2287c9bf0eb',
              firstName: 'Jamini',
              lastName: 'Samarathunge',
              telephone:'0712633377',
              role: 'admin',
              email: 'jami@gmail.com',
            }, 'findOne');
          const results = await adminModel.getAdmin('614f3b459a76f2287c9bf0eb');
          expect(results.telephone).toBe('0712633377');
        });
      });
  });