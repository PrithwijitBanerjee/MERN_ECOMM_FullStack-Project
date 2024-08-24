/** Load express third-party library/ backend framework **/
const express = require('express');

/** Load http-errors external module for handling http related errors **/
const createError = require('http-errors')

/** Load xss-clean external middleware for sanitize any data in req.body, req.query, and req.params **/
const xss = require('xss-clean');

/** Load cookie-parser external middleware for extracting cookie information of client machine from client requests **/
const cookieParser = require('cookie-parser');

/** Load user related routes **/
const userRoutes = require('./routes/users.routes');

/** Load authentication related routes **/
const authRoutes = require('./routes/auth.routes');

/** Load product related routes **/
const productRoutes = require('./routes/product.routes');

/** Load seed users related routes **/
const seedRouter = require('./routes/seed.routes');

/** Load category related routes **/
const categoryRouter = require('./routes/category.routes');

/** Load cart related routes **/
const cartRoutes = require('./routes/cart.routes');

/** Load slider related routes **/
const sliderRouter = require('./routes/slider.routes');

/** Load order related routes **/
const orderRouter = require('./routes/order.routes');

/** Load config module **/
const config = require('./config/config');

/** Load express-rate-limit external middleware **/
const { rateLimit } = require('express-rate-limit');

/** Load morgan external middlewares **/
const morgan = require('morgan');

/** Load cors external middlewares **/
const cors = require('cors');

const { errorResponseHandler } = require('./helpers/responseHandler');

/** create an application level server of express **/
const app = express();

/** built-in body-parser middlewares of express used in app level **/
app.use(express.json()); // for mobile clients/ hybrid clients
app.use(express.urlencoded({ extended: true })); // for web clients like: React/ Vue/ Angular JS ...

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
    message: 'You can only make 5 requests in  every one minute !!!'
});

app.use(cookieParser());
app.use(xss());
app.use(morgan('dev')); // for identify incoming request ... logger

// app.use(rateLimiter);


/** disable CORS to tell express server to share API data to clients from different base url with different port no. **/
app.use(cors({
    origin: [config.app.clientUrl],
    credentials: true  // Allow credentials for (cookies, etc.)

}));

// to tell express server to share its static resources to the client 
app.use(express.static(__dirname + '/public/images/'));

/** Basic Landing Page **/
app.get('/', (_, res) => {
    res.status(200).sendFile(__dirname + '/views/');
});

/** for test the rest apis **/
app.get('/api/test', (_, res) => {
    res.status(200).json({
        success: true,
        message: 'Api is working fine'
    });
});

/** for seed users **/
app.use('/api/seed', seedRouter);

/** Define all user related routes in application **/
app.use(`${config.app.apiUrl}/users`, userRoutes);

/** Define all authentication related routes in application **/
app.use(`${config.app.apiUrl}/auth`, authRoutes);

/** Define all category related routes in application **/
app.use(`${config.app.apiUrl}/categories`, categoryRouter);

/** Define all product related routes in application **/
app.use(`${config.app.apiUrl}/products`, productRoutes);

/** Define all slider related routes in application **/
app.use(`${config.app.apiUrl}/sliders`, sliderRouter);

/** Define all cart related routes in application **/
app.use(`${config.app.apiUrl}/carts`, cartRoutes);

/** Define all order related routes in application **/
app.use(`${config.app.apiUrl}/orders`, orderRouter);

/** Handles route not found client error by custom middleware **/
app.use((req, res, next) => {
    next(createError(404, 'This Route does not exist !!!'));
});

/** Handles all types of server error by custom middleware **/
app.use((error, req, res, next) => {
    if (res.headersSent) {
        next(error); // calling express default error handling middleware functions
    } else {
        errorResponseHandler(res, { status: error?.status, message: error?.message });
    }
});
module.exports = app;
console.log("app module is loading ...");
