const vendorRequestSchema= require('../../../database/schemas/vendorRequest');
const mockingoose = require('mockingoose');
const vendorRequestModel=require('../../../models/vendorRequest')

describe('vendor request actions', () => {
    describe('getRequest', () => {
        it ('should return a request', async () => {
          mockingoose(vendorRequestSchema).toReturn(
            {
              _id: '614b901004e0d0e9f61a816f',
              fullName: 'John Perera',
              telephone: '0777777777',
              nic:'fdasfadsf',
              address: '37, Warunagama, Wellawaya',
              shopName: 'asdfadsfadsfas',
              permitId:'asdfasdf',
              regionToBeCovered: 'asdfasdf',
              numberOfVehicles: '1',
              vehicles:{
                0:{
                    _id:'614b0ba3503ac11a2862c58c',
                    plateNumber: 'brand',
                    brand: 'model',
                    model:'plate',
                    imageUrl: '',
                    documentUrl: '',
                }
              },
              created_at:'2021-09-22T10:55:31.953+00:00',
              updated_at:'2021-09-26T18:02:13.379+00:00',
              status:'pending',
              email:'jamisanju2@gmail.com',
            }, 'findOne');
          const results = await vendorRequestModel.getRequest('614b0ba3503ac11a2862c58c');
          expect(results.telephone).toBe('0777777777');
        });
      });


      describe('getRequestByTelephoneNumber', () => {
        it ('should return a request of given telephonenumber', async () => {
            mockingoose(vendorRequestSchema).toReturn(
                {
                  _id: '614b901004e0d0e9f61a816f',
                  fullName: 'John Perera',
                  telephone: '0777777777',
                  nic:'fdasfadsf',
                  address: '37, Warunagama, Wellawaya',
                  shopName: 'asdfadsfadsfas',
                  permitId:'asdfasdf',
                  regionToBeCovered: 'asdfasdf',
                  numberOfVehicles: '1',
                  vehicles:{
                    0:{
                        _id:'614b0ba3503ac11a2862c58c',
                        plateNumber: 'brand',
                        brand: 'model',
                        model:'plate',
                        imageUrl: '',
                        documentUrl: '',
                    }
                  },
                  created_at:'2021-09-22T10:55:31.953+00:00',
                  updated_at:'2021-09-26T18:02:13.379+00:00',
                  status:'pending',
                  email:'jamisanju2@gmail.com',
                }, 'findOne');
              const results = await vendorRequestModel.getRequestByTelephoneNumber('0777777777');
              expect(results.id).toBe('614b901004e0d0e9f61a816f');
            });
          });


          describe('getRequestByEmail', () => {
            it ('should return a request of given email', async () => {
                mockingoose(vendorRequestSchema).toReturn(
                    {
                      _id: '614b901004e0d0e9f61a816f',
                      fullName: 'John Perera',
                      telephone: '0777777777',
                      nic:'fdasfadsf',
                      address: '37, Warunagama, Wellawaya',
                      shopName: 'asdfadsfadsfas',
                      permitId:'asdfasdf',
                      regionToBeCovered: 'asdfasdf',
                      numberOfVehicles: '1',
                      vehicles:{
                        0:{
                            _id:'614b0ba3503ac11a2862c58c',
                            plateNumber: 'brand',
                            brand: 'model',
                            model:'plate',
                            imageUrl: '',
                            documentUrl: '',
                        }
                      },
                      created_at:'2021-09-22T10:55:31.953+00:00',
                      updated_at:'2021-09-26T18:02:13.379+00:00',
                      status:'pending',
                      email:'jamisanju2@gmail.com',
                    }, 'findOne');
                  const results = await vendorRequestModel.getRequestByEmail('jamisanju2@gmail.com');
                  expect(results.id).toBe('614b901004e0d0e9f61a816f');
                });
              });




              describe('getEmail', () => {
                it ('should return a email of given request id', async () => {
                    mockingoose(vendorRequestSchema).toReturn(
                        {
                          _id: '614b901004e0d0e9f61a816f',
                          fullName: 'John Perera',
                          telephone: '0777777777',
                          nic:'fdasfadsf',
                          address: '37, Warunagama, Wellawaya',
                          shopName: 'asdfadsfadsfas',
                          permitId:'asdfasdf',
                          regionToBeCovered: 'asdfasdf',
                          numberOfVehicles: '1',
                          vehicles:{
                            0:{
                                _id:'614b0ba3503ac11a2862c58c',
                                plateNumber: 'brand',
                                brand: 'model',
                                model:'plate',
                                imageUrl: '',
                                documentUrl: '',
                            }
                          },
                          created_at:'2021-09-22T10:55:31.953+00:00',
                          updated_at:'2021-09-26T18:02:13.379+00:00',
                          status:'pending',
                          email:'jamisanju2@gmail.com',
                        }, 'findOne');
                      const results = await vendorRequestModel.getEmail('614b901004e0d0e9f61a816f');
                      expect(results.email).toBe('jamisanju2@gmail.com');
                    });
                  });
    


      describe('getRequests', () => {
        it ('should return the list of requests', async () => {
          mockingoose(vendorRequestSchema).toReturn([
            {
                _id: '614b901004e0d0e9f61a816f',
                fullName: 'John Perera',
                telephone: '0777777777',
                nic:'fdasfadsf',
                address: '37, Warunagama, Wellawaya',
                shopName: 'asdfadsfadsfas',
                permitId:'asdfasdf',
                regionToBeCovered: 'asdfasdf',
                numberOfVehicles: '1',
                vehicles:{
                  0:{
                      _id:'614b0ba3503ac11a2862c58c',
                      plateNumber: 'brand',
                      brand: 'model',
                      model:'plate',
                      imageUrl: '',
                      documentUrl: '',
                  }
                },
                created_at:'2021-09-22T10:55:31.953+00:00',
                updated_at:'2021-09-26T18:02:13.379+00:00',
                status:'pending',
                email:'jamisanju2@gmail.com',
              },

            {
              _id: '614b901004e0d0e9f61a817f',
              fullName: 'John Perera',
              telephone: '0777777778',
              nic:'fdasfadsf',
              address: '37, Warunagama, Wellawaya',
              shopName: 'asdfadsfadsfas',
              permitId:'asdfasdf',
              regionToBeCovered: 'asdfasdf',
              numberOfVehicles: '1',
              vehicles:{
                0:{
                    _id:'614b0ba3503ac11a2862c58c',
                    plateNumber: 'brand',
                    brand: 'model',
                    model:'plate',
                    imageUrl: '',
                    documentUrl: '',
                }
              },
              created_at:'2021-09-22T10:55:31.953+00:00',
              updated_at:'2021-09-26T18:02:13.379+00:00',
              status:'pending',
              email:'jamisanju2@gmail.com',
            }
          ], 'find');
          const results = await vendorRequestModel.getRequests();
          expect(results[0].telephone).toBe('0777777777');
          expect(results[1].telephone).toBe('0777777778');
        });
      });
  });