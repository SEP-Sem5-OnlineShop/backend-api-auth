var Product = require('mongoose').model('Product');

const products = [
    new Product({
        product_name: 'Burger with some',
        seller: '613eb365af0d5b2c142fa326',
        imageThumbnailUrl: '/img/item1.png',
        imageUrl: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 2,
        reviews: [
            {
                rating: 4.0,
                review: 'good product',
                customer: '613ebc89c71d2e07e0ec5e93',
            },
            {
                rating: 5.0,
                review: 'good product',
                customer: '613ebc89c71d2e07e0ec5e93',
            },
        ],
    }),
    new Product({
        product_name: 'Burger with some',
        seller: '613eb365af0d5b2c142fa326',
        imageThumbnailUrl: '/img/item1.png',
        imageUrl: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 2,
    }),
    new Product({
        product_name: 'Burger with some',
        seller: '613eb365af0d5b2c142fa326',
        imageThumbnailUrl: '/img/item1.png',
        imageUrl: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 2,
    }),
    new Product({
        product_name: 'Burger with some',
        seller: '613eb365af0d5b2c142fa326',
        imageThumbnailUrl: '/img/item1.png',
        imageUrl: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 2,
    }),
    new Product({
        product_name: 'Burger with some',
        seller: '613eb365af0d5b2c142fa326',
        imageThumbnailUrl: '/img/item1.png',
        imageUrl: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 2,
    }),
];
module.exports = products