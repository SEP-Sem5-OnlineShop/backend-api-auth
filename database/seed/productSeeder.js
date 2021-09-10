var Product = require('mongoose').model('Product');
var User = require('mongoose').model('User');

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
            seedProduct('0712345679', products[0]);
            seedProduct('0712345679', products[1]);
            seedProduct('0712345679', products[2]);
            seedProduct('0712345679', products[3]);
            seedProduct('0712345679', products[4]);
        }
    });
    function seedProduct(telephoneNo, product) {
        User.findOne({ telephone: telephoneNo }).exec()
        .then(function (user) {
            return Product.create({ product_name: product.product_name, image: product.image, price: product.price, stock: product.stock, status: product.status,  rating: product.rating, numReviews: product.numReviews, seller: user._id });
        });
    }
};