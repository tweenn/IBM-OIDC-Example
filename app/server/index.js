require('dotenv').config();

const favicon = require('serve-favicon');

const app = require('express')()
require('./middleware')(app);
require('./routes')(app);

module.exports = app;
