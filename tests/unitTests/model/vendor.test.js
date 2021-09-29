const vendorSchema= require('../../../database/schemas/userSchema');
const mockingoose = require('mockingoose');
const vendorModel=require('../../../models/vendor')
// test('giving id 6152a6a13c07a2ce71c6ca85 expects admin', () => {
//     const obj=admin.getAdmin('6152a6a13c07a2ce71c6ca85')
//     // console.log(obj)
//     expect(obj);
// });


describe('vendor actions', () => {
    describe('getVendor', () => {
        it ('should return a vendor', async () => {
          mockingoose(vendorSchema).toReturn(
            {
              _id: '614f6ab86728ee0a9450195c',
              firstName: 'John',
              lastName: 'fdasfadsf',
              telephone:'0712345678',
              role: 'vendor',
              email: 'g@gmail.com',
              vendor:{
                status:'accepted'
              }
            }, 'findOne');
          const results = await vendorModel.getVendor('614f6ab86728ee0a9450195c');
          expect(results.telephone).toBe('0712345678');
        });
      });


      describe('getEmail', () => {
        it ('should return a email of given vendor', async () => {
          mockingoose(vendorSchema).toReturn(
            {
              _id: '614f6ab86728ee0a9450195c',
              firstName: 'John',
              lastName: 'fdasfadsf',
              telephone:'0712345678',
              role: 'vendor',
              email: 'g@gmail.com',
              vendor:{
                status:'accepted'
              }
            }, 'findOne');
          const results = await vendorModel.getEmail('614f6ab86728ee0a9450195c');
          expect(results.email).toBe('g@gmail.com');
        });
      });


      describe('getVendors', () => {
        it ('should return the list of vendors', async () => {
          mockingoose(vendorSchema).toReturn([
            {
              _id: '614f6ab86728ee0a9450195c',
              firstName: 'John',
              lastName: 'fdasfadsf',
              telephone:'0712345678',
              role: 'vendor',
              email: 'g@gmail.com',
              vendor:{
                status:'accepted'
              }
            },
            {
              _id: '614eeb59513c0604604437d8',
              firstName: 'Darshana Sandaruwan',
              lastName: 'fdasfadsf',
              telephone:'0712633444',
              role: 'vendor',
              email: 'jamisanju2@gmail.com',
              vendor:{
                status:'rejected'
              }
            }
          ], 'find');
          const results = await vendorModel.getVendors();
          expect(results[0].telephone).toBe('0712345678');
          expect(results[1].telephone).toBe('0712633444');
        });
      });
  });