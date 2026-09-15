const express = require('express');
const path = require('node:path');

module.exports = (app) => {
	app.set('views', path.resolve(process.cwd(), './app/views'));
	app.set('view engine', 'hbs');
	app.use(express.static(path.resolve(process.cwd(), './app/public')));
};
