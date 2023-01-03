// const http = require('http');

// const routes = require('./routes');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://yemoelwin01:09444301010yml@cluster0.ni3s6hw.mongodb.net/shop';
// const cookieParser = require('cookie-parser')

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + file.originalname)
        // cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {

        cb(null, false);
    }
}

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./my_routes/admin');
const shopRoutes = require('./my_routes/shop.js');
const authRoutes = require('./my_routes/auth');

// next(); /* this allows the request to continue to the next middleware in line */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
        /*cookie: { expires }*/
    })
)
// app.use(cookieParser())
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use((req, res, next) => {
    // throw new Error('Sync Dummy')
    if (!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id)
        .then(user => {
            // throw new Error('Dummy');
            if (!user) {
                return next()
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err))
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500)

app.use(errorController.get404);

app.use((error, req, res, next) => {
    // res.status(error.httpStatusCode).render(...);
    // res.redirect('/500')
    res.status(500).render('500', {
        pageTitle: 'Error',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
})
// res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
// const server = http.createServer(routes.handler)

// server.listen(3000);

/* MongoDb connect */
// mongoConnect(() => {
//     app.listen(3000);
// });

/* Mongoose Connect */
mongoose
    .connect(MONGODB_URI)
    .then(result => {
        // User.findOne().then(user => {
        //     if(!user) {
        //         const user = new User({
        //             name: 'Tudy',
        //             email: 'tudy@realbird.com',
        //             cart: {
        //                 items: []
        //             }
        //         });
        //         user.save();
        //     };
        // });
        app.listen(3000, console.log('Connected right now'));
    })
    .catch(err => {
        console.log(err);
    })