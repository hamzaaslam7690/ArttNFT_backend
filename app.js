const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require("cors");
//const AppError = require('./utils/appError');
const app = express();
const globalErrorHandal = require('./controllers/erroeController');

//set security HTTP headers
app.use(helmet())
app.use(cors())

// global middleware use 
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message:'To many request from this api , please try again in an hour,'
})
 // limit request for same api
app.use('/api', limiter);
// Body parser reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// data sanitization against NoSql injection
app.use(mongoSanitize());

// data sanitization against NoSql injection
app.use(xss());
// prevent  parameter pollution
app.use(hpp({
    whitelist:['duration']
}));

// serving static file

// test middleware
app.use((req, res, next) => { 
    res.requestTime = new Date().toISOString();
    next();
});  

app.use("/wallet", require("./routes/walletRouter"));
// end route

// middeware error handle not matching route
app.all('*', (req, res, next) => {
    next(new AppError(`can not find ${req.originalUrl} on this server `,400));
});
// Global error handle middaware
app.use(globalErrorHandal);
module.exports = app;
