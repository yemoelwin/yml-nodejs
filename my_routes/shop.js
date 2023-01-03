// const path  = require('path');

// const express = require('express');

// const rootDir = require('../util/path');

// const adminData = require('./admin');

// const router = express.Router();

// router.get('/',(req, res, next) => {
//     // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
//     // console.log('shop.js',adminData.products);
//     // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
//     const products = adminData.products;
//     res.render('shop', { prods : products , pageTitle : 'Shop' , path : '/'});
// })
// module.exports = router;

const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

router.get('/orders/:orderId', isAuth, shopController.getInvoice);

// router.get('/checkout', shopController.getCheckout);

// router.get('/product-detail');

module.exports = router;
