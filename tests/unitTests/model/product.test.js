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

      describe('getVendorSellProductList', () => {
        it ('should return the list of products with given seller id and stock gt 0', async () => {
            mockingoose(productSchema).toReturn([
              {
                  _id: '6152e3cca58556299c756046',
                  discount: '0',
                  stock: '10',
                  rating:'4.8',
                  numReviews: '2',
                  product_name: 'Burger with Fries1',
                  seller:'613eb365af0d5b2c142fa366',
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
                  rating:'4.9',
                  numReviews: '2',
                  product_name: 'Burger with Fries2',
                  seller:'613eb365af0d5b2c142fa366',
                  imageThumbnailUrl: '/img/item1.png',
                  description: 'product description',
                  price:'100',
                  status:'available',
                  created_at:'2021-09-22T10:55:31.953+00:00',
                  updated_at:'2021-09-26T18:02:13.379+00:00',

                }
            ], 'find');
            const results = await getVendorSellProductList('613eb365af0d5b2c142fa366');
            expect(results[0].product_name).toBe('Burger with Fries1');
          });
        });
      
        // describe('addReview', () => {
        // it ('should return the list of products with given seller id and stock gt 0', async () => {
        //     mockingoose(productSchema).toReturn(
        //       {
        //           _id: '6152e3cca58556299c756046',
        //           discount: '0',
        //           stock: '10',
        //           rating:'4.8',
        //           numReviews: '2',
        //           product_name: 'Burger with Fries1',
        //           seller:'613eb365af0d5b2c142fa366',
        //           imageThumbnailUrl: '/img/item1.png',
        //           description: 'product description',
        //           price:'100',
        //           status:'available',
        //           created_at:'2021-09-22T10:55:31.953+00:00',
        //           updated_at:'2021-09-26T18:02:13.379+00:00',

        //         }, 'find');
        //     const results = await addReview('6152e3cca58556299c756046',{customer_id:'613eb365af0d5b2c142fa366',rating:3,review:'good'});
        //     expect(results.product_name).toBe('Burger with Fries1');
        //   });
        // });
  });
