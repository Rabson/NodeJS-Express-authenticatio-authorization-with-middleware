const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routers = require('./routers');
const { errorHandler } = require('./middlewares');

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use('/api', routers);

// if error is not an instanceOf ApiError, convert it.
app.use(errorHandler.converter);

// catch 404 and forward to error handler
app.use(errorHandler.notFound);

module.exports = { app };
