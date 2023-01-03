const path = require('path');
const express = require('express');
const { body } = require('express-validator');

// const rootDir = require('../util/path');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

/* /admin/add-product => GET */
router.get('/add-product', isAuth, adminController.getAddProduct);
// res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

/* /admin/add-product => POST */
router.post('/add-product', [
    body('title')
        .isString()
        // .isAlphanumeric()
        .isLength({ min: 3 })
        .trim(),
    // body('imageUrl')
    //     .isURL(),
    body('price')
        .isFloat(),
    body('description')
        .isLength({ min: 5, max: 500 })
        .trim()
], isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body('title')
        // .isAlphanumeric()
        .isString()
        .isLength({ min: 3 })
        .trim(),
    // body('imageUrl')
    // .isURL(),
    body('price')
        .isFloat(),
    body('description')
        .isLength({ min: 5, max: 500 })
        .trim()
], isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;

