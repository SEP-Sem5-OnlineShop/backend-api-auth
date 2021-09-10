var User = require('mongoose').model('User');
var Product = require('mongoose').model('Product');

const products = [
    {
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
    },
    {
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
    },
    {
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
    },
    {
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
    },
    {
        product_name: 'Burger with some',
        image: '/img/item1.png',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 10,
    },
];

// function seedProducts(products) {
exports.seedProducts = function seedProducts(products) {
    Product.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            seedProducts('0712345679', products[0]);
            seedProducts('0712345679', products[1]);
            seedProducts('0712345679', products[2]);
            seedProducts('0712345679', products[3]);
            seedProducts('0712345679', products[4]);
        }
    });
    function seedProducts(telephoneNo, product) {
        User.findOne({ telephone: telephoneNo }).exec()
        .then(function (user) {
            return Product.create({ product: product, seller: user._id });
        });
    }
};