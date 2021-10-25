const mockingoose = require('mockingoose');
const productSchema= require('../../../database/schemas/productSchema');
const {
    getProduct,
    getProducts,
    getMaxProducts,
    getVendorProductList,
    getList,
    getVendorSellProductList,
    addReview
} = require('../../../models/product');

describe('product', () => {
    describe('getProduct', () => {
        it ('should return a product', async () => {
          mockingoose(productSchema).toReturn(
            {
              _id: '6152e3cca58556299c756046',
              discount: '0',
              stock: '10',
              rating:'4.5',
              numReviews: '2',
              product_name: 'Burger with Fries',
              seller:'613eb365af0d5b2c142fa326',
              imageThumbnailUrl: '/img/item1.png',
              description: 'product description',
              price:'100',
              status:'available',
              created_at:'2021-09-22T10:55:31.953+00:00',
              updated_at:'2021-09-26T18:02:13.379+00:00',

            }, 'findOne');
          const results = await getProduct('6152e3cca58556299c756046');
          expect(results.product_name).toBe('Burger with Fries');
        });
      });


      describe('getProducts', () => {
        it ('should return the list of products according to given seller id', async () => {
            mockingoose(productSchema).toReturn([
              {
                  _id: '6152e3cca58556299c756046',
                  discount: '0',
                  stock: '10',
                  rating:'4.5',
                  numReviews: '2',
                  product_name: 'Burger with Fries',
                  seller:'613eb365af0d5b2c142fa356',
                  imageThumbnailUrl: '/img/item1.png',
                  description: 'product description',
                  price:'100',
                  status:'available',
                  created_at:'2021-09-22T10:55:31.953+00:00',
                  updated_at:'2021-09-26T18:02:13.379+00:00',

                },
                {
                  _id: '6152e3cca58556299c756056',
                  discount: '0',
                  stock: '10',
                  rating:'4.5',
                  numReviews: '2',
                  product_name: 'Burger',
                  seller:'613eb365af0d5b2c142fa356',
                  imageThumbnailUrl: '/img/item1.png',
                  description: 'product description',
                  price:'100',
                  status:'available',
                  created_at:'2021-09-22T10:55:31.953+00:00',
                  updated_at:'2021-09-26T18:02:13.379+00:00',

                }
            ], 'find');
            const results = await getProducts('613eb365af0d5b2c142fa356');
            expect(results[0].product_name).toBe('Burger with Fries');
            expect(results[1].product_name).toBe('Burger');
          });
        });

    describe('getMaxProducts', () => {
        it ('should return the list of products with max ratigs', async () => {
            mockingoose(productSchema).toReturn([
              {
                  _id: '6152e3cca58556299c756046',
                  discount: '0',
                  stock: '10',
                  rating:'4.8',
                  numReviews: '2',
                  product_name: 'Burger with Fries',
                  seller:'613eb365af0d5b2c142fa356',
                  imageThumbnailUrl: '/img/item1.png',
                  description: 'product description',
                  price:'100',
                  status:'available',
                  reviews:{
                    0:{
                        _id:'6152e3cca58556299c756047',
                        rating: '4',
                        review: 'good product',
                        customer:'613ebc89c71d2e07e0ec5e93',
                    },
                    1:{
                        _id:'6152e3cca58556299c756048',
                        rating: '5',
                        review: 'good product',
                        customer:'613ebc89c71d2e07e0ec5e93',
                    }
                  },
                  created_at:'2021-09-22T10:55:31.953+00:00',
                  updated_at:'2021-09-26T18:02:13.379+00:00',

                },
                {
                  _id: '6152e3cca58556299c756056',
                  discount: '0',
                  stock: '10',
                  rating:'4.9',
                  numReviews: '2',
                  product_name: 'Burger',
                  seller:'613eb365af0d5b2c142fa356',
                  imageThumbnailUrl: '/img/item1.png',
                  description: 'product description',
                  price:'100',
                  status:'available',
                  reviews:{
                    0:{
                        _id:'6152e3cca58556299c756057',
                        rating: '4',
                        review: 'good product',
                        customer:'613ebc89c71d2e07e0ec5e53',
                    },
                    1:{
                        _id:'6152e3cca58556299c756058',
                        rating: '5',
                        review: 'good product',
                        customer:'613ebc89c71d2e07e0ec5e53',
                    }
                  },
                  created_at:'2021-09-22T10:55:31.953+00:00',
                  updated_at:'2021-09-26T18:02:13.379+00:00',

                }
            ], 'find');
            const results = await getMaxProducts();
            expect(results[0].product_name).toBe('Burger with Fries');
          });
        });

    describe('getVendorProductList', () => {
        it ('should return the list of products with given seller id', async () => {
            mockingoose(productSchema).toReturn([
              {
                  _id: '6152e3cca58556299c756046',
                  discount: '0',
                  stock: '10',
                  rating:'4.8',
                  numReviews: '2',
                  product_name: 'Burger with Fries',
                  seller:'613eb365af0d5b2c142fa356',
                  imageThumbnailUrl: '/img/item1.png',
                  description: 'product description',
                  price:'100',
                  status:'available',
                  reviews:{
                    0:{
                        _id:'6152e3cca58556299c756047',
                        rating: '4',
                        review: 'good product',
                        customer:'613ebc89c71d2e07e0ec5e93',
                    },
                    1:{
                        _id:'6152e3cca58556299c756048',
                        rating: '5',
                        review: 'good product',
                        customer:'613ebc89c71d2e07e0ec5e93',
                    }
                  },
                  created_at:'2021-09-22T10:55:31.953+00:00',
                  updated_at:'2021-09-26T18:02:13.379+00:00',

                },
                {
                  _id: '6152e3cca58556299c756056',
                  discount: '0',
                  stock: '10',
                  rating:'4.9',
                  numReviews: '2',
                  product_name: 'Burger with Fries',
                  seller:'613eb365af0d5b2c142fa366',
                  imageThumbnailUrl: '/img/item1.png',
                  description: 'product description',
                  price:'100',
                  status:'available',
                  reviews:{
                    0:{
                        _id:'6152e3cca58556299c756057',
                        rating: '4',
                        review: 'good product',
                        customer:'613ebc89c71d2e07e0ec5e53',
                    },
                    1:{
                        _id:'6152e3cca58556299c756058',
                        rating: '5',
                        review: 'good product',
                        customer:'613ebc89c71d2e07e0ec5e53',
                    }
                  },
                  created_at:'2021-09-22T10:55:31.953+00:00',
                  updated_at:'2021-09-26T18:02:13.379+00:00',

                }
            ], 'find');
            const results = await getVendorProductList('613eb365af0d5b2c142fa356');
            expect(results[0].product_name).toBe('Burger with Fries');
          });
        });


      describe('getList', () => {
        it ('should return the list of products', async () => {
          mockingoose(productSchema).toReturn([
            {
                _id: '6152e3cca58556299c756046',
                discount: '0',
                stock: '10',
                rating:'4.5',
                numReviews: '2',
                product_name: 'Burger with Fries',
                seller:'613eb365af0d5b2c142fa326',
                imageThumbnailUrl: '/img/item1.png',
                description: 'product description',
                price:'100',
                status:'available',
                created_at:'2021-09-22T10:55:31.953+00:00',
                updated_at:'2021-09-26T18:02:13.379+00:00',

              },
              {
                _id: '6152e3cca58556299c756056',
                discount: '0',
                stock: '10',
                rating:'4.5',
                numReviews: '2',
                product_name: 'Burger',
                seller:'613eb365af0d5b2c142fa356',
                imageThumbnailUrl: '/img/item1.png',
                description: 'product description',
                price:'100',
                status:'available',
                created_at:'2021-09-22T10:55:31.953+00:00',
                updated_at:'2021-09-26T18:02:13.379+00:00',

              }
          ], 'find');
          const results = await getList();
          expect(results[0].product_name).toBe('Burger with Fries');
          expect(results[1].product_name).toBe('Burger');
        });
      });
  });




//   mockingoose(productSchema).toReturn([
//     {
//         _id: '6152e3cca58556299c756046',
//         discount: '0',
//         stock: '10',
//         rating:'4.8',
//         numReviews: '2',
//         product_name: 'Burger with Fries',
//         seller:'613eb365af0d5b2c142fa356',
//         imageThumbnailUrl: '/img/item1.png',
//         description: 'product description',
//         price:'100',
//         status:'available',
//         reviews:{
//           0:{
//               _id:'6152e3cca58556299c756047',
//               rating: '4',
//               review: 'good product',
//               customer:'613ebc89c71d2e07e0ec5e93',
//           },
//           1:{
//               _id:'6152e3cca58556299c756048',
//               rating: '5',
//               review: 'good product',
//               customer:'613ebc89c71d2e07e0ec5e93',
//           }
//         },
//         created_at:'2021-09-22T10:55:31.953+00:00',
//         updated_at:'2021-09-26T18:02:13.379+00:00',

//       },
//       {
//         _id: '6152e3cca58556299c756056',
//         discount: '0',
//         stock: '10',
//         rating:'4.9',
//         numReviews: '2',
//         product_name: 'Burger with Fries',
//         seller:'613eb365af0d5b2c142fa366',
//         imageThumbnailUrl: '/img/item1.png',
//         description: 'product description',
//         price:'100',
//         status:'available',
//         reviews:{
//           0:{
//               _id:'6152e3cca58556299c756057',
//               rating: '4',
//               review: 'good product',
//               customer:'613ebc89c71d2e07e0ec5e53',
//           },
//           1:{
//               _id:'6152e3cca58556299c756058',
//               rating: '5',
//               review: 'good product',
//               customer:'613ebc89c71d2e07e0ec5e53',
//           }
//         },
//         created_at:'2021-09-22T10:55:31.953+00:00',
//         updated_at:'2021-09-26T18:02:13.379+00:00',

//       }
//   ], 'find');