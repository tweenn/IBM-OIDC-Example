const session = require('express-session');

module.exports = (app) => {
	// Passport requires session to persist the authentication
	// so were using express-session for this example
	app.use(session({
		secret: 'protect the world',
		resave: false,
		saveUninitialized: true
	}));
};
