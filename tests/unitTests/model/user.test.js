const userSchema= require('../../../database/schemas/userSchema');
const mockingoose = require('mockingoose');
const userModel=require('../../../models/user')

describe('user actions', () => {
    describe('getUserByTelephone', () => {
        it ('should return a user for a given telephone', async () => {
          mockingoose(userSchema).toReturn(
            {
              _id: '613eba8b94acbe3710fed690',
              firstName: 'Darsahana',
              lastName: 'Sandaruwan',
              telephone:'0712633371',
              role: '3customer',
              
            }, 'findOne');
          const results = await userModel.getUserByTelephone('0712633371');
          expect(results.firstName).toBe('Darsahana');
        });
      });


      describe('getUserByEmail', () => {
        it ('should return a user for a given email', async () => {
          mockingoose(userSchema).toReturn(
            {
              _id: '614c9da5d749b2022811c2bb',
              firstName: 'Darsahana',
              lastName: 'Sandaruwan',
              telephone:'0711111111',
              role: 'vendor',
              email:'ty@gmail.com',
              
            }, 'findOne');
          const results = await userModel.getUserByEmail('ty@gmail.com');
          expect(results.firstName).toBe('Darsahana');
        });
      });


   
  });