#!/usr/bin/env node

/**
 * Module dependencies.
 */
const app = require('../app/server');
const https = require('node:https');

const options = require('./utility/load-certs');

const normalizePort = require('./utility/https/normalize-port');
const onError = require('./utility/https/on-error');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '4500');
app.set('port', port);

/**
 * Create HTTPs server.
 */
const server = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
console.log(`Application is now listening on port ${port}\r\nYou can access the app now at https://localhost:${port} 🤟`);
